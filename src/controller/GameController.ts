import { GameState, Indicators } from '@src/model/GameState';
import { Event } from '@src/model/Events';
import { Response, ResponseSelectionResult } from '@src/model/Response';
import cloneDeep from 'lodash/cloneDeep';
import { Feedback } from '@src/model/Feedback';
import { Dictionary } from 'highcharts';

export const isGameState = (nextTurn: Event[] | GameState): nextTurn is GameState => {
    return (nextTurn as any)?.turnNumber !== undefined;
};

export class GameController {
    private gameState: GameState;
    private storyEvents: Event[];
    private eventsToRespond: Event[];

    constructor(storyEvents: Event[]) {
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
    public respondToEvent(responseId: String): Feedback {
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
        function updateIndicators(updatedIndicators: Dictionary<string | Array<string>>, indicators: Indicators){
            for (const [key, value] of Object.entries(updatedIndicators)) {
                indicators[key] = value;
            }
            return indicators;
        }
        this.gameState.indicators = updateIndicators(result.updatedIndicators, this.gameState.indicators)

        // Save response history
        this.saveResponseToHistory(response, result);

        return result.feedback;
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

    private saveResponseToHistory(response: Response, result: ResponseSelectionResult) {
        if (this.gameState.responseHistory.length < this.gameState.turnNumber) {
            this.gameState.responseHistory.push({ responses: [] });
        }

        const currentTurnHistory = this.gameState.responseHistory[this.gameState.responseHistory.length - 1];
        currentTurnHistory.responses.push(cloneDeep({ response, result }));
    }
}

export default GameController;
