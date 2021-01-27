import jStat from 'jstat';
import cloneDeep from 'lodash/cloneDeep';
import { FakeNegativeBinomial } from './Probabilities';
import {
    ContainmentPolicy,
    SimulatorMetrics,
    NextTurnState,
    PlayerActions,
    Scenario,
    SimulatorState,
    TimelineEntry,
    WorldState
} from './SimulatorModel';

export class Simulator {
    private scenario: Scenario;
    private scaleFactor: number;
    private currentTurn: WorldState;
    private timeline: TimelineEntry[];

    constructor(scenario: Scenario) {
        this.scenario = scenario;
        this.scaleFactor = scenario.gdpPerDay * 0.35;
        this.currentTurn = this.computeInitialWorldState();
        this.timeline = [];
    }

    reset(turn: number = 0): Simulator {
        const newSimulator = new Simulator(this.scenario);
        const baseline = turn - 1;
        if (baseline > 0 && this.timeline.length >= baseline) {
            const targetTurn = this.timeline[baseline - 1];
            newSimulator.timeline = this.clone(this.timeline.slice(0, baseline));

            const history = newSimulator.mutableHistory();
            newSimulator.currentTurn = this.clone({
                ...targetTurn,
                metrics: history[history.length - 1]
            });
        } else {
            newSimulator.timeline = [];
            newSimulator.currentTurn = this.computeInitialWorldState();
        }

        return newSimulator;
    }

    lastTurn(): number {
        return this.timeline.length;
    }

    /**
     * Allows the caller to obtain a snapshot of the current simulator state.
     */
    private mutableState(): SimulatorState {
        return {
            scenario: this.scenario,
            currentTurn: this.currentTurn,
            timeline: this.timeline,
            history: this.mutableHistory()
        };
    }

    state(): SimulatorState {
        // Return an immutable copy of the state.
        return this.clone(this.mutableState());
    }

    history(): SimulatorMetrics[] {
        return this.clone(this.mutableHistory());
    }

    private mutableHistory(): SimulatorMetrics[] {
        const playthroughHistory = this.timeline.length === 0 ? [] : this.timeline.flatMap((it) => it.history);
        return this.scenario.runUpPeriod.concat(playthroughHistory);
    }

    /**
     * Processes the next turn by computing the effects of player actions, random events and the natural
     * progression of the epidemic.
     */
    nextTurn(playerActions: PlayerActions, daysToAdvance: number = 1): NextTurnState {
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
        let history = this.timeline.length === 0 ? [this.currentTurn.metrics] : [];
        let complete_history = this.mutableHistory().concat(history);
        for (let i = 0; i < daysToAdvance; i++) {
            latestMetrics = this.computeNextPandemicDay(stateAtTurnEnd, metricsAtTurnStart, complete_history);
            metricsAtTurnStart = latestMetrics;
            // Add the last indicators to the world timeline.
            history.push(this.clone(latestMetrics));
            complete_history = this.mutableHistory().concat(history);
        }

        // Update the next turn's indicators
        stateAtTurnEnd.metrics = latestMetrics;

        // Advance the current turn to match the state at turn end.
        this.currentTurn = stateAtTurnEnd;
        this.timeline.push(
            this.clone({
                ...stateAtTurnEnd,
                history: history
            })
        );

        return this.clone({
            lastTurnMetrics: history,
            latestMetrics: latestMetrics
        });
    }

    private computeNextPandemicDay(
        candidateState: WorldState,
        lastResult: SimulatorMetrics,
        history: SimulatorMetrics[]
    ): SimulatorMetrics {
        let actionR = candidateState.metrics.r;
        const prevCases = lastResult.numInfected;
        // Don't allow cases to exceed hospital capacity
        const hospitalCapacity = lastResult.hospitalCapacity;
        const lockdownRatio = hospitalCapacity / prevCases;
        const cappedActionR = prevCases * actionR >= hospitalCapacity ? lockdownRatio : actionR;
        actionR = cappedActionR;

        // Compute next state
        let new_num_infected = this.generateNewCasesFromDistribution(prevCases, actionR);
        new_num_infected = Math.max(Math.floor(new_num_infected), 0);
        new_num_infected = Math.min(new_num_infected, this.scenario.totalPopulation);
        // Deaths from infections started 20 days ago

        const lag = 20;
        const long_enough = history.length >= lag;
        const mortality = this.scenario.mortality;
        const new_deaths_lagging = long_enough ? history[history.length - lag].numInfected * mortality : 0;
        const currentDay = lastResult.days + 1;
        const deathCosts = this.computeDeathCost(new_deaths_lagging);
        const economicCosts = this.computeEconomicCosts(actionR);
        const medicalCosts = this.computeHospitalizationCosts(new_num_infected);
        return {
            days: currentDay,
            numDead: new_deaths_lagging,
            numInfected: new_num_infected,
            totalPopulation: this.scenario.totalPopulation,
            hospitalCapacity: this.scenario.hospitalCapacity,
            r: candidateState.metrics.r,
            importedCasesPerDay: this.scenario.importedCasesPerDay,
            deathCosts: deathCosts,
            economicCosts: economicCosts,
            medicalCosts: medicalCosts,
            totalCost: deathCosts + economicCosts + medicalCosts
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
                numDead: 0,
                numInfected: this.scenario.initialNumInfected,
                totalPopulation: this.scenario.totalPopulation,
                hospitalCapacity: this.scenario.hospitalCapacity,
                r: this.scenario.r0,
                importedCasesPerDay: this.scenario.importedCasesPerDay,
                deathCosts: deathCosts,
                economicCosts: economicCosts,
                medicalCosts: medicalCosts,
                totalCost: deathCosts + economicCosts + medicalCosts
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
        if (r >= this.scenario.r0) {
            return 0;
        }
        const daysTilDoubling = 10;
        const growthRateOriginal = this.scenario.r0 ** daysTilDoubling;
        const growthRateNew = r ** daysTilDoubling;
        return (this.scaleFactor * (growthRateOriginal - growthRateNew)) / growthRateOriginal;
    }

    private generateNewCasesFromDistribution(num_infected: number, action_r: number) {
        const lam = this.generateNewCases(num_infected, action_r);
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

    private generateNewCases(numInfected: number, r: number) {
        const fractionSusceptible = 1; // immune population?
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
