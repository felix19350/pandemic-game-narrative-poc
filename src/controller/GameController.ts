import { GameState } from '@src/model/GameState';
import { Event, CompletedEvent } from '@src/model/Events';
import { Response, ResponseSelectionResult } from '@src/model/Response';
import cloneDeep from 'lodash/cloneDeep';
import { Simulator } from '../simulator/Simulator';
import { PlayerActions, Scenario } from '@src/simulator/SimulatorModel';

export const isGameState = (nextTurn: Event[] | GameState): nextTurn is GameState => {
    return (nextTurn as any)?.turnNumber !== undefined;
};

const emptyAction: PlayerActions = {
    containmentPolicies: [],
    capabilityImprovements: []
};

export class GameController {
    private gameState: GameState;
    private storyEvents: Event[];
    private eventsToRespond: Event[];
    private simulator: Simulator;
    private playerActionsForTurn: PlayerActions;

    constructor(scenario: Scenario, storyEvents: Event[]) {
        this.simulator = new Simulator(scenario);
        this.playerActionsForTurn = cloneDeep(emptyAction);
        this.storyEvents = storyEvents;
        this.eventsToRespond = [];
        this.gameState = {
            turnNumber: 0,
            indicators: {
                reputation: [],
                publicSupport: 0, // negative numbers indicate disapproval, positive numbers approve
                businessSupport: 0,
                healthcareSupport: 0,
                lockdownEffectiveness: 1, // 0 = lockdown lifted, 1 = lockdown in effect, 0.8 = lockdown in effect but less effective
                vaccineEffectiveness: 1
            },
            responseHistory: []
        };
    }

    /**
     * Advances the game to the next turn. Returns any new events for that turn, or the game state signifying that the game's
     * narrative has concluded, and the player can review his choices.
     */
    public nextTurn(): Event[] | GameState {
        if (!this.canProceedToNextTurn()) {
            throw new Error(
                'Cannot proceed to next turn. There are still pending events the player needs to respond to.'
            );
        }
        this.gameState.turnNumber += 1;
        this.simulator.nextTurn(this.playerActionsForTurn, 30); //TODO: discuss if we want to advance the simulator after each event response.
        this.playerActionsForTurn = cloneDeep(emptyAction);
        this.eventsToRespond = this.chooseNextEvents();

        if (this.eventsToRespond.length === 0) {
            // The story has run its course, game will end and the game state will be returned so the player can review his choices
            return cloneDeep(this.gameState);
        } else {
            return cloneDeep(this.eventsToRespond);
        }
    }

    /**
     * Records the user's response to an event and produces an immediate feedback.
     */
    public get currentGameState(): GameState {
        return this.gameState;
    }

    public respondToEvent(responseId: String): CompletedEvent {
        const response = this.storyEvents.flatMap((it) => it.responses).find((it) => it.id === responseId);
        if (!response) {
            throw new Error(`Cannot find response with id: ${responseId}`);
        }

        if (!response.isApplicable(this.gameState)) {
            throw new Error('Response is not applicable');
        }
        const result = response.onSelect(this.gameState);

        // retain all events that are not the one that the current response pertains to
        this.eventsToRespond = this.eventsToRespond.filter((evt) => evt.id !== response.eventId);

        // Update the game state
        this.gameState.indicators = result.updatedIndicators;
        this.saveResponseToHistory(response, result);
        //To-Do: Change history to save CompletedEvent objects instead

        const thisEvent = this.storyEvents.find((it) => it.id === response.eventId);
        return {
            event: thisEvent,
            feedback: result.feedback,
            response: response,
            reputation: result.updatedIndicators.reputation
        };
    }

    /**
     * The game can only proceed to the next turn if there are no events to respond.
     */
    public canProceedToNextTurn(): boolean {
        return this.eventsToRespond.length === 0;
    }

    private chooseNextEvents(): Event[] {
        return this.storyEvents.filter((event) => event.canRun(this.gameState));
    }
    /* To-Do: can use to make end game history */
    private saveResponseToHistory(response: Response, result: ResponseSelectionResult) {
        if (this.gameState.responseHistory.length < this.gameState.turnNumber) {
            this.gameState.responseHistory.push({ responses: [] });
        }

        const currentTurnHistory = this.gameState.responseHistory[this.gameState.responseHistory.length - 1];
        currentTurnHistory.responses.push(cloneDeep({ response, result }));
    }
}

export default GameController;
