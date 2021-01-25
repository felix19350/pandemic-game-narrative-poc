export interface SimulatorState {
    scenario: Scenario;
    currentTurn: TurnHistoryEntry;
    timeline: TimelineEntry[];
    history: Indicators[];
}

export interface Scenario {
    totalPopulation: number;
    initialNumInfected: number;
    initialMedicalCosts: number;
    initialEconomicCosts: number;
    initialDeathCosts: number;
    importedCasesPerDay: number;
    r0: number;
    runUpPeriod: Indicators[];
    hospitalCapacity: number;
    gdpPerDay: number;
    power: number;
    distr_family: string;
    dynamics: string;
    mortality: number; // A number between 0 and 1 representing the mortality
    time_lumping: boolean;
    initialContainmentPolicies: ContainmentPolicy[];
    initialCapabilityImprovements: CapabilityImprovements[];
    availableInGameEvents: InGameEvent[];
    victoryConditions: VictoryCondition[];
}

export interface VictoryCondition {
    name: string;
    description: string;
    isMet(simulatorState: SimulatorState): boolean;
}

/**
 * Represents an in game event.
 */
export interface InGameEvent {
    name: string;
    description: string;
    happensOnce: boolean;
    cssClass: string;
    canActivate: (context: SimulatorState) => boolean;
    choices: EventChoice[];
}

export interface EventChoice {
    name: string;
    description: string;
    immediateEffect: (context: SimulatorState) => SimulatorState;
    recurringEffect: (context: SimulatorState) => SimulatorState;
}

export interface RecordedInGameEventChoice {
    inGameEventName: string;
    choice: EventChoice;
}

/**
 * Represents the state of the simulation on a given turn.
 */
export interface Indicators {
    days: number;
    totalPopulation: number;
    numInfected: number;
    numDead: number;
    importedCasesPerDay: number;
    r: number;
    hospitalCapacity: number;
    medicalCosts: number;
    economicCosts: number;
    deathCosts: number;
    totalCost: number;
}

/**
 * Containment policies are specific actions that can be taken in conjunction, in the context of a containment doctrine,
 * assuming the required capability improvement requirements are met.
 */
export interface ContainmentPolicy {
    id: string;
    icon: string;
    requirements: CapabilityImprovements[];
    name: string;
    activeLabel: string;
    inactiveLabel: string;
    immediateEffect: (context: WorldState) => Indicators;
    recurringEffect: (context: WorldState) => Indicators;
}

/**
 * Represents specific improvements to the healthcare sector (e.g. contact tracing infrastructure)
 */
export interface CapabilityImprovements {
    name: string;
    immediateEffect: (context: WorldState) => Indicators;
    recurringEffect: (context: WorldState) => Indicators;
}

/**
 * Represents the set of player actions in effect at a given point in time
 */
export interface PlayerActions {
    containmentPolicies: ContainmentPolicy[];
    capabilityImprovements: CapabilityImprovements[];
    inGameEventChoices: RecordedInGameEventChoice[];
}

export interface TurnHistoryEntry {
    availablePlayerActions: {
        containmentPolicies: ContainmentPolicy[];
        capabilityImprovements: CapabilityImprovements[];
    };
    nextInGameEvents: InGameEvent[];
    playerActions: PlayerActions;
}

export type WorldState = { indicators: Indicators } & TurnHistoryEntry;

export type TimelineEntry = { history: Indicators[] } & TurnHistoryEntry;

export interface VictoryState {
    lastTurnIndicators: Indicators[];
    victoryCondition: VictoryCondition;
    score: number;
}

/**
 * Models the updated state of the world at the start of a new turn
 */
export interface NextTurnState {
    latestIndicators: Indicators;
    lastTurnIndicators: Indicators[];
    newInGameEvents: InGameEvent[];
}

/**
 * Models the state where the game ends due to a victory condition being met
 */

export const isNextTurn = (nextTurn: NextTurnState | VictoryState): nextTurn is NextTurnState => {
    return (nextTurn as any)?.newInGameEvents !== undefined;
};
