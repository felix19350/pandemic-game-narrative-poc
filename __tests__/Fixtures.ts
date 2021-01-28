import { GameState } from '@src/model/GameState';
import { Event } from '@src/model/Events';
import { ContainmentPolicy, Scenario, CapabilityImprovements } from '@src/simulator/SimulatorModel';

export const CloseTransit: ContainmentPolicy = {
    id: 'transport',
    name: 'Transport',
    icon: 'fa-plane-departure',
    requirements: [],
    activeLabel: 'Closed',
    inactiveLabel: 'Open',
    immediateEffect: (context) => context.metrics,
    recurringEffect: (context) => {
        const updatedWorldState = { ...context.metrics };
        updatedWorldState.r = Math.max(updatedWorldState.r - 0.03, 0);
        return updatedWorldState;
    }
};

export const CloseSchools: ContainmentPolicy = {
    id: 'schools',
    name: 'Schools',
    icon: 'fa-graduation-cap',
    requirements: [],
    activeLabel: 'Closed',
    inactiveLabel: 'Open',
    immediateEffect: (context) => context.metrics,
    recurringEffect: (context) => {
        const updatedWorldState = { ...context.metrics };
        updatedWorldState.r = Math.max(updatedWorldState.r - 0.03, 0);
        return updatedWorldState;
    }
};

export const testScenario: Scenario = {
    totalPopulation: 400000000, // 400 million people -- i.e. approximate US population
    initialNumInfected: 10000, // 100,000 people infected -- we're in the middle of a pandemic!
    initialDeathCosts: 0,
    initialMedicalCosts: 0,
    initialEconomicCosts: 0,
    runUpPeriod: [],
    r0: 1.08, // infections double every 10 days
    importedCasesPerDay: 0.1,
    hospitalCapacity: 1000000, // 1 million hospital beds -- https://www.aha.org/statistics/fast-facts-us-hospitals
    gdpPerDay: 2e13 / 365.0,
    power: 1,
    distr_family: 'nbinom',
    dynamics: 'SIS',
    mortality: 0.01,
    time_lumping: false,
    initialContainmentPolicies: [CloseSchools, CloseTransit],
    initialCapabilityImprovements: []
};

export const emptyPlayerAction = {
    containmentPolicies: [] as ContainmentPolicy[],
    capabilityImprovements: [] as CapabilityImprovements[]
};

export const simpleBinaryChoiceNarrative: Event[] = [
    {
        id: 'start',
        name: 'Start of narrative',
        description: 'A fancy text',
        canRun: (gameState: GameState) => {
            return gameState.turnNumber === 1;
        },
        responses: [
            {
                id: 'start.goLeft',
                eventId: 'start',
                name: 'Go left',
                label: ['Go left'],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        reputation: [
                            {
                                id: 'left',
                                name: 'Left',
                                icon: 'string',
                                description: 'string'
                            }
                        ]
                    },
                    feedback: {
                        toResponse: 'left',
                        fromPublic: 'left',
                        fromBusiness: 'left',
                        fromHealthcare: 'left'
                    }
                })
            },
            {
                id: 'start.goRight',
                eventId: 'start',
                name: 'Go right',
                label: ['Go right'],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: {
                        ...gameState.indicators,
                        reputation: [
                            {
                                id: 'right',
                                name: 'Right',
                                icon: 'string',
                                description: 'string'
                            }
                        ]
                    },
                    feedback: {
                        toResponse: 'right',
                        fromPublic: 'right',
                        fromBusiness: 'right',
                        fromHealthcare: 'right'
                    }
                })
            }
        ]
    },
    {
        id: 'left',
        name: 'Left branch',
        description: 'A fancy text',
        canRun: (gameState: GameState) => {
            if (gameState.responseHistory.length < 1) {
                return false;
            } else {
                const wentLeft = gameState.responseHistory[gameState.responseHistory.length - 1].responses.find(
                    (resp) => resp.response.id === 'start.goLeft'
                );
                return gameState.turnNumber === 2 && wentLeft !== undefined;
            }
        },
        responses: [
            {
                id: 'left.end',
                eventId: 'left',
                name: 'Finish',
                label: ['Narrative ended on the left branch'],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: gameState.indicators,
                    feedback: {
                        toResponse: 'done left',
                        fromPublic: 'done left',
                        fromBusiness: 'done left',
                        fromHealthcare: 'done left'
                    }
                })
            }
        ]
    },
    {
        id: 'right',
        name: 'Right branch',
        description: 'A fancy text',
        canRun: (gameState: GameState) => {
            if (gameState.responseHistory.length < 1) {
                return false;
            } else {
                const wentRight = gameState.responseHistory[gameState.responseHistory.length - 1].responses.find(
                    (resp) => resp.response.id === 'start.goRight'
                );
                return gameState.turnNumber === 2 && wentRight !== undefined;
            }
        },
        responses: [
            {
                id: 'right.end',
                eventId: 'right',
                name: 'Finish',
                label: ['Narrative ended on the right branch'],
                isApplicable: (gameState: GameState) => true,
                onSelect: (gameState: GameState) => ({
                    updatedIndicators: gameState.indicators,
                    feedback: {
                        toResponse: 'done right',
                        fromPublic: 'done right',
                        fromBusiness: 'done right',
                        fromHealthcare: 'done right'
                    }
                })
            }
        ]
    }
];
