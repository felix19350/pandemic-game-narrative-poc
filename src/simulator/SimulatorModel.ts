export interface SimulatorState {
    scenario: Scenario;
    history: SimulatorMetrics[];
    currentTurn: TurnHistoryEntry;
}

export interface Scenario {
    totalPopulation: number;
    initialNumDead: number,
    initialNumInfected: number;
    initialMedicalCosts: number;
    initialEconomicCosts: number;
    initialDeathCosts: number;
    importedCasesPerDay: number;
    r0: number;
    hospitalCapacity: number;
    runUpPeriod: SimulatorMetrics[];
    gdpPerDay: number;
    power: number;
    distr_family: string;
    dynamics: string;
    mortality: number; // A number between 0 and 1 representing the mortality
    time_lumping: boolean;
    initialContainmentPolicies: ContainmentPolicy[];
    initialCapabilityImprovements: CapabilityImprovements[];
    dailyIncreaseInImmunity: number;
    baseImmunity: number;
    initialPublicSupport: number;
}

/**
 * Represents the state of the simulation on a given turn.
 */
export interface SimulatorMetrics {
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
    baseImmunity: number;
    dailyIncreaseInImmunity: number;
    dailyChangeInCases: number;
    publicSupport: number;
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
    immediateEffect: (context: WorldState) => SimulatorMetrics;
    recurringEffect: (context: WorldState) => SimulatorMetrics;
}

/**
 * Represents specific improvements to the healthcare sector (e.g. contact tracing infrastructure)
 */
export interface CapabilityImprovements {
    name: string;
    immediateEffect: (context: WorldState) => SimulatorMetrics;
    recurringEffect: (context: WorldState) => SimulatorMetrics;
}

/**
 * Represents the set of player actions in effect at a given point in time
 */
export interface PlayerActions {
    containmentPolicies: ContainmentPolicy[];
    capabilityImprovements: CapabilityImprovements[];
}

export interface TurnHistoryEntry {
    availablePlayerActions: {
        containmentPolicies: ContainmentPolicy[];
        capabilityImprovements: CapabilityImprovements[];
    };
    playerActions: PlayerActions;
}

export type WorldState = { metrics: SimulatorMetrics } & TurnHistoryEntry;
