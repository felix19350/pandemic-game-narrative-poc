import { Simulator } from '@src/simulator/Simulator';
import { ContainmentPolicy, SimulatorMetrics } from '@src/simulator/SimulatorModel';
import { testScenario, emptyPlayerAction, CloseTransit } from './Fixtures';

describe('The operation of the Simulator', () => {
    describe('Initialization process', () => {
        it('Can be initialized with a scenario', () => {
            const simulator = new Simulator(testScenario);
            const s0 = simulator.state();
            expect(s0.scenario).toEqual(testScenario);
            expect(s0.history.length).toBe(testScenario.runUpPeriod.length);
        });
    });

    describe('Turn-by-turn operation', () => {
        it('From one turn to the next, if nothing is done the number of infected, and total cost grows', () => {
            // Given a simulator in the initial state:
            const daysPerturn = 10;
            const simulator = new Simulator(testScenario);
            const initialState = simulator.state();

            // When the next turn is invoked without any player actions
            const nextTurn = simulator.nextTurn(emptyPlayerAction, daysPerturn);

            // Then the pandemic runs its course
            expect(nextTurn.days).toBe(daysPerturn);
            expect(nextTurn.totalCost).toBeGreaterThan(0);
            expect(nextTurn.numInfected).toBeGreaterThan(testScenario.initialNumInfected);
        });

        it('Starts counting dead after the first few turns', () => {
            // Given a simulator instance
            const simulator = new Simulator(testScenario);

            // When some turns have elapsed
            const minTurns = 25; // Give it a few more turns because of randomness
            let nextTurn: SimulatorMetrics;
            for (let i = 0; i < minTurns; i++) {
                nextTurn = simulator.nextTurn(emptyPlayerAction);
            }

            // Then we expect some deaths
            expect(nextTurn.numDead).toBeGreaterThan(0);

            // And the history has the expected number of turns
            expect(simulator.state().history.length).toBe(minTurns);
        });

        it('Calls the immediate effect of a player action in the first turn it appears', () => {
            // Given a simulator
            const simulator = new Simulator(testScenario);

            // When a new player action is added in a turn
            const actionUnderTest = { ...CloseTransit };
            const spyImmediateEffect = jest.spyOn(actionUnderTest, 'immediateEffect');
            const spyRecurringEffect = jest.spyOn(actionUnderTest, 'recurringEffect');
            simulator.nextTurn({
                containmentPolicies: [actionUnderTest as ContainmentPolicy],
                capabilityImprovements: []
            });
            // Then its immediate effect is called
            expect(spyImmediateEffect).toHaveBeenCalled();
            // And the recurring effect is not called
            expect(spyRecurringEffect).toHaveBeenCalled();

            spyImmediateEffect.mockRestore();
            spyRecurringEffect.mockRestore();
        });

        it('Calls the recurring effect of a player action in the following turns', () => {
            // Given a simulator
            const simulator = new Simulator(testScenario);

            // When a new player action is added in a turn
            simulator.nextTurn({
                containmentPolicies: [CloseTransit],
                capabilityImprovements: []
            });

            // And it is active in the next turn as well
            const actionUnderTest = { ...CloseTransit };
            const spyImmediateEffect = jest.spyOn(actionUnderTest, 'immediateEffect');
            const spyRecurringEffect = jest.spyOn(actionUnderTest, 'recurringEffect');
            simulator.nextTurn({
                containmentPolicies: [actionUnderTest],
                capabilityImprovements: []
            });
            // Then its immediate effect is called
            expect(spyRecurringEffect).toHaveBeenCalled();
            expect(spyImmediateEffect).not.toHaveBeenCalled();

            spyRecurringEffect.mockRestore();
            spyImmediateEffect.mockRestore();
        });

        it('Correctly keeps track of the indicator history items affected by each player turn', () => {
            // Given a simulator instance
            const daysPerturn = 10;
            const numTurns = 10;
            const simulator = new Simulator(testScenario);

            // When a few turns spanning more that one simulator days pass
            for (let i = 0; i < numTurns; i++) {
                simulator.nextTurn(emptyPlayerAction, daysPerturn);
            }

            // Then the history has the correct number of results
            const currentState = simulator.state();
            expect(currentState.history.length).toEqual(daysPerturn * numTurns); // The initial metrics are appended on the first turn
        });
    });
});
