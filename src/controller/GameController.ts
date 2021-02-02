import { GameState } from '@src/model/GameState';
import { Event, CompletedEvent } from '@src/model/Events';
import { Response, ResponseSelectionResult } from '@src/model/Response';
import cloneDeep from 'lodash/cloneDeep';
import { Simulator } from '../simulator/Simulator';
import { PlayerActions, Scenario } from '@src/simulator/SimulatorModel';

export class GameController {
    private gameState: GameState;
    private storyEvents: Event[];
    private eventsToRespond: Event[];
    private simulator: Simulator;
    private playerActionsForTurn: PlayerActions;

    constructor(scenario: Scenario, storyEvents: Event[]) {
        this.simulator = new Simulator(scenario);
        this.playerActionsForTurn = {containmentPolicies: [], capabilityImprovements: []};
        this.storyEvents = storyEvents;
        this.eventsToRespond = [];
        this.gameState = {
            turnNumber: 0,
            indicators: {
                reputation: [],
                support: 50,
                poll: {support: null, oppose: null}, // negative numbers indicate disapproval, positive numbers approve
                containmentPolicies: []
            },
            responseHistory: []
        };
    }

    /**
     * Advances the game to the next turn. Returns any new events for that turn, or the game state signifying that the game's
     * narrative has concluded, and the player can review his choices.
     */
    public nextTurn(): { 
        endgame: Boolean;
        gameState: GameState;
        nextEvent: Event;
    } {
        if (!this.canProceedToNextTurn()) {
            throw new Error(
                'Cannot proceed to next turn. There are still pending events the player needs to respond to.'
            );
        }

        this.gameState.turnNumber += 1;
        this.eventsToRespond = this.chooseNextEvents();
        
        if (this.eventsToRespond.length === 0) {
            // The story has run its course, game will end and the game state will be returned so the player can review his choices
            return {
                endgame: true,
                gameState: cloneDeep(this.gameState),
                nextEvent: null
            }
            
        } else {
            return {
                endgame: false,
                gameState: cloneDeep(this.gameState),
                nextEvent: cloneDeep(this.eventsToRespond[0])
            }
        }
    }

    /**
     * Records the user's response to an event and produces an immediate feedback.
     */
    public get currentGameState(): GameState {
        return this.gameState;
    }

    public respondToEvent(responseId: String): EndOfTurnSummary {
        const response = this.storyEvents.flatMap((it) => it.responses).find((it) => it.id === responseId);
        if (!response) {
            throw new Error(`Cannot find response with id: ${responseId}`);
        }

        if (!response.isApplicable(this.gameState)) {
            throw new Error('Response is not applicable');
        }
        const result = response.onSelect(this.gameState);

        // Get this current event being responded to
        const thisEvent = this.storyEvents.find((it) => it.id === response.eventId);

        // Containment policies
        this.playerActionsForTurn.containmentPolicies = result.playerActions.containmentPolicies;
        this.gameState.indicators.containmentPolicies = result.playerActions.containmentPolicies;

        // retain all events that are not the one that the current response pertains to
        this.eventsToRespond = this.eventsToRespond.filter((evt) => evt.id !== response.eventId);
        
        // Update the game state
        this.gameState.indicators = result.updatedIndicators;
        this.gameState.indicators.containmentPolicies = result.playerActions.containmentPolicies;
        this.gameState.indicators.support = Math.min(100, Math.max(0, 50 - result.updatedIndicators.poll.support)); // Calculate support

        // Save response to history
        this.saveResponseToHistory(response, result);

        // Advance simulator
        const nx = this.simulator.nextTurn(this.playerActionsForTurn, 30, this.gameState.indicators.support); 

        return {
            event: cloneDeep(thisEvent),
            response: cloneDeep(response),
            history: {
                thisMonth: {
                    simulator: cloneDeep(nx.history.slice(Math.max(nx.history.length - 30, 0))),
                    indicators: cloneDeep(this.gameState.indicators),
                    feedback: cloneDeep(result.feedback)
                },
                lastMonth: {
                    simulator: cloneDeep(nx.history.slice(Math.max(nx.history.length - 60, 30))),
                    indicators: null // TO-DO: Add history for public support indicator
                },
                allTime: {
                    simulator: cloneDeep(nx.history),
                    indicators: null
                },
            }
        };
    }

    /**
     * The game can only proceed to the next turn if there are no events to respond.
     */
    public canProceedToNextTurn(): boolean {
        return this.eventsToRespond.length === 0;
    }

    private chooseNextEvents(): Event[] {
        console.log(this.gameState)
        console.log(this.storyEvents)
        console.log(this.storyEvents[1].canRun(this.gameState))
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
