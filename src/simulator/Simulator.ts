import jStat from 'jstat';
import cloneDeep from 'lodash/cloneDeep';
import { FakeNegativeBinomial } from './Probabilities';
import {
    ContainmentPolicy,
    SimulatorMetrics,
    PlayerActions,
    Scenario,
    SimulatorState,
    WorldState
} from './SimulatorModel';

export class Simulator {
    private scenario: Scenario;
    private scaleFactor: number;
    private currentTurn: WorldState;
    private history: SimulatorMetrics[];

    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.scaleFactor = scenario.gdpPerDay * 0.35;
        this.currentTurn = this.computeInitialWorldState();
        this.history = [];
    }

    /**
     * Allows the caller to obtain a snapshot of the current simulator state.
     */
    private mutableState(): SimulatorState {
        return {
            scenario: this.scenario,
            history: this.history,
            currentTurn: this.currentTurn
        };
    }

    state(): SimulatorState {
        // Return an immutable copy of the state.
        return this.clone(this.mutableState());
    }

    /**
     * Processes the next turn by computing the effects of player actions, random events and the natural
     * progression of the epidemic.
     */
    nextTurn(playerActions: PlayerActions, daysToAdvance: number = 1, publicSupport: number): {
        worldState: WorldState;
        history: SimulatorMetrics[];
    } {
        // Store player previous player turn
        let stateAtTurnEnd = this.clone(this.currentTurn);

        // Reset the baseline R for the turn
        stateAtTurnEnd.metrics.r = this.scenario.r0;

        // Factor in any new player actions.
        const newContainmentPolicies: ContainmentPolicy[] = this.findNewContainmentPolicies(
            playerActions.containmentPolicies
        );
        for (const containmentPolicy of newContainmentPolicies) {
            stateAtTurnEnd.metrics = containmentPolicy.immediateEffect(stateAtTurnEnd);
        }

        // Factor in the recurring effects of existing player actions.
        for (const containmentPolicy of playerActions.containmentPolicies) {
            stateAtTurnEnd.metrics = containmentPolicy.recurringEffect(stateAtTurnEnd);
        }
        
        // Add the new containment policies to the history of player actions
        stateAtTurnEnd.playerActions.containmentPolicies = playerActions.containmentPolicies;

        // Advance world timeline the desired number of days
        let latestMetrics;
        let metricsAtTurnStart = this.currentTurn.metrics;
        // The initial state is added on the first play

        // Add public support
        metricsAtTurnStart.publicSupport = publicSupport;

        const turnR = stateAtTurnEnd.metrics.r;
        for (let i = 0; i < daysToAdvance; i++) {
            latestMetrics = this.computeNextPandemicDay(turnR, metricsAtTurnStart);
            metricsAtTurnStart = latestMetrics;
            this.history.push(latestMetrics);
        }

        // Update the next turn's indicators
        stateAtTurnEnd.metrics = latestMetrics;

        // Advance the current turn to match the state at turn end.
        this.currentTurn = stateAtTurnEnd;

        return {
            worldState: cloneDeep(this.currentTurn),
            history: cloneDeep(this.history)
        }
    }

    private computeNextPandemicDay(turnR: number, previousDayMetrics: SimulatorMetrics): SimulatorMetrics {
        const prevCases = previousDayMetrics.numInfected;

        // Calculate immunity
        const currentDay = previousDayMetrics.days + 1;
        const immunity = this.scenario.baseImmunity + ( this.scenario.dailyIncreaseInImmunity * currentDay )

        // Compute next state
        let new_num_infected = this.generateNewCasesFromDistribution(prevCases, turnR, immunity);
        new_num_infected = Math.max(Math.floor(new_num_infected), 0);
        new_num_infected = Math.min(new_num_infected, this.scenario.totalPopulation);
        // Deaths from infections started 20 days ago

        const history = this.history;
        const lag = 20;
        const long_enough = history.length >= lag;
        const mortality = this.scenario.mortality;
        const new_deaths_lagging = long_enough ? history[history.length - lag].numInfected * mortality : 0;
        const deathCosts = this.computeDeathCost(new_deaths_lagging);
        const economicCosts = this.computeEconomicCosts(turnR);
        const medicalCosts = this.computeHospitalizationCosts(new_num_infected);
        const increaseInDailyNewCases = new_num_infected - prevCases;

        return {
            days: currentDay,
            numDead: new_deaths_lagging,
            numInfected: new_num_infected,
            totalPopulation: this.scenario.totalPopulation,
            hospitalCapacity: this.scenario.hospitalCapacity,
            r: turnR,
            importedCasesPerDay: this.scenario.importedCasesPerDay,
            deathCosts: deathCosts,
            economicCosts: economicCosts,
            medicalCosts: medicalCosts,
            totalCost: deathCosts + economicCosts + medicalCosts,
            baseImmunity: this.scenario.baseImmunity,
            dailyIncreaseInImmunity: this.scenario.dailyIncreaseInImmunity,
            dailyChangeInCases: increaseInDailyNewCases,
            publicSupport: previousDayMetrics.publicSupport,
        };
    }

    private computeInitialWorldState(): WorldState {
        // TODO: The hospitalization costs will not be zero on the first turn!
        const deathCosts = this.scenario.initialDeathCosts;
        const economicCosts = this.scenario.initialEconomicCosts;
        const medicalCosts = this.scenario.initialMedicalCosts;
        return {
            availablePlayerActions: {
                capabilityImprovements: this.scenario.initialCapabilityImprovements,
                containmentPolicies: this.scenario.initialContainmentPolicies
            },
            metrics: {
                days: 0,
                numDead: this.scenario.initialNumDead,
                numInfected: this.scenario.initialNumInfected,
                totalPopulation: this.scenario.totalPopulation,
                hospitalCapacity: this.scenario.hospitalCapacity,
                r: this.scenario.r0,
                importedCasesPerDay: this.scenario.importedCasesPerDay,
                deathCosts: deathCosts,
                economicCosts: economicCosts,
                medicalCosts: medicalCosts,
                totalCost: deathCosts + economicCosts + medicalCosts,
                baseImmunity: this.scenario.baseImmunity,
                dailyIncreaseInImmunity: this.scenario.dailyIncreaseInImmunity,
                dailyChangeInCases: 0,
                publicSupport: this.scenario.initialPublicSupport
            },
            playerActions: {
                capabilityImprovements: [],
                containmentPolicies: []
            }
        };
    }

    private computeDeathCost(numDead: number): number {
        const costPerDeath = 1e7; // https://www.npr.org/transcripts/835571843: value of a statistical life
        return numDead * costPerDeath;
    }

    private computeHospitalizationCosts(numInfected: number): number {
        const hospitalization_rate = 0.1; // 10% of those infected will require hospitalization
        const num_hospitalizations = numInfected * hospitalization_rate;
        const cost_per_hospitalization = 50000; // $50,000 per hospital visit -- average amount billed to insurance (can dig up this reference if needed; it was on this order of magnitude)
        return num_hospitalizations * cost_per_hospitalization;
    }

    private computeEconomicCosts(r: number): number {
        if (r >= this.scenario.r0) { // TO-DO Investigate what happens now I raised r to 3.4
            return 0;
        }
        const daysTilDoubling = 10;
        const growthRateOriginal = this.scenario.r0 ** daysTilDoubling;
        const growthRateNew = r ** daysTilDoubling;
        return (this.scaleFactor * (growthRateOriginal - growthRateNew)) / growthRateOriginal;
    }

    private generateNewCasesFromDistribution(num_infected: number, action_r: number, immunity: number) {
        const lam = this.generateNewCases(num_infected, action_r, immunity);
        const r_single_chain = 0.17; // 50.0;
        const lam_single_chain = 1.0 * action_r;
        const p_single_chain = lam_single_chain / (r_single_chain + lam_single_chain);

        const single_chain_distr = new FakeNegativeBinomial(r_single_chain, p_single_chain);
        const new_num_infected_mean = single_chain_distr.getMean() * lam;
        const new_num_infected_variance = single_chain_distr.getVariance() * lam;

        const new_num_infected = Math.max(
            0,
            Math.floor(jStat.normal.sample(new_num_infected_mean, new_num_infected_variance ** 0.5))
        );

        return new_num_infected + this.currentTurn.metrics.importedCasesPerDay; // remove stochasticity; was: return new_num_infected;
    }

    private generateNewCases(numInfected: number, r: number, immunity: number) {
        const fractionSusceptible = Math.max(1 - immunity, 0);
        const expectedNewCases = numInfected * r * fractionSusceptible; // + this.currentTurn.indicators.importedCasesPerDay;
        return expectedNewCases;
    }

    private findNewContainmentPolicies(containmentPoliciesOfTurn: ContainmentPolicy[]): ContainmentPolicy[] {
        const previousPolicies = this.currentTurn.playerActions.containmentPolicies.map((it) => it.name);
        return containmentPoliciesOfTurn.filter(
            (containmentPolicy) => previousPolicies.indexOf(containmentPolicy.name) == -1
        );
    }

    private clone<T>(obj: T): T {
        return cloneDeep(obj);
    }
}
