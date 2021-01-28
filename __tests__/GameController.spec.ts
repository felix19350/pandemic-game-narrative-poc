import GameController, { isGameState } from '@src/controller/GameController';
import { simpleBinaryChoiceNarrative, testScenario } from './Fixtures';

describe('The operation of the game controller', () => {
    const gameController = new GameController(testScenario, simpleBinaryChoiceNarrative);

    it('Is able to start', () => {
        expect(gameController.canProceedToNextTurn()).toBe(true);
    });

    it('Returns the event for the first turn', () => {
        const nextTurn = gameController.nextTurn();

        // Expect the event to match the first item on the narrative
        if (isGameState(nextTurn)) {
            fail('Should have returned an event.');
        } else {
            expect(gameController.canProceedToNextTurn()).toBe(false);
            expect(nextTurn.length).toBe(1);
            expect(nextTurn[0].id).toEqual('start');
            expect(nextTurn[0].name).toEqual('Start of narrative');
        }
    });

    it("Stores the player's choices for each event", () => {
        const response = gameController.respondToEvent('start.goLeft');
        expect(response.feedback).toEqual({
            toResponse: 'left',
            fromPublic: 'left',
            fromBusiness: 'left',
            fromHealthcare: 'left'
        });
        expect(gameController.canProceedToNextTurn()).toBe(true);
    });

    it('Presents the next event', () => {
        const nextTurn = gameController.nextTurn();
        // Expect the event to match the first item on the narrative
        if (isGameState(nextTurn)) {
            fail('Should have returned an event.');
        } else {
            expect(gameController.canProceedToNextTurn()).toBe(false);
            expect(nextTurn.length).toBe(1);
            expect(nextTurn[0].id).toEqual('left');
            expect(nextTurn[0].name).toEqual('Left branch');
        }
    });

    it('Returns the game state once there are no more events to return', () => {
        const response = gameController.respondToEvent('left.end');
        expect(response.feedback).toEqual({
            toResponse: 'done left',
            fromPublic: 'done left',
            fromBusiness: 'done left',
            fromHealthcare: 'done left'
        });
        expect(gameController.canProceedToNextTurn()).toBe(true);

        const nextTurn = gameController.nextTurn();
        if (isGameState(nextTurn)) {
            expect(nextTurn.indicators.reputation).toEqual([
                {
                    id: 'left',
                    name: 'Left',
                    icon: 'string',
                    description: 'string'
                }
            ]); // Reputation is consistent with the narrative
            expect(nextTurn.turnNumber).toBe(3);
            expect(nextTurn.responseHistory.length).toBe(2);
            expect(nextTurn.responseHistory[0].responses[0].response.id).toEqual('start.goLeft');
            expect(nextTurn.responseHistory[1].responses[0].response.id).toEqual('left.end');
        } else {
            fail('Should have returned the game state signaling the end of the game.');
        }
    });
});
