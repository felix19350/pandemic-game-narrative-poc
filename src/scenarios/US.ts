import { Scenario } from '@src/simulator/SimulatorModel';
import { currentLockdown } from '../simulator/PlayerActions';

export const GDP_US = 2e13; // 20 trillion dollars: annual US GDP

export const US: Scenario = {
    totalPopulation: 400000000, // 400 million people -- i.e. approximate US population
    initialNumInfected: 147159, // Jan 1st cases for US, source: https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html
    initialMedicalCosts: 1252215000,
    initialEconomicCosts: 10576809135,
    initialDeathCosts: 19173932258,
    r0: 3.6, // estimated R with no countermeasures http://epidemicforecasting.org/containment-calculator
    importedCasesPerDay: 0.1,
    hospitalCapacity: 1000000, // 1 million hospital beds -- https://www.aha.org/statistics/fast-facts-us-hospitals
    runUpPeriod: [], // Disable run-up period
    gdpPerDay: GDP_US / 365.0,
    power: 1,
    distr_family: 'nbinom',
    dynamics: 'SIS',
    mortality: 0.01,
    time_lumping: false,
    initialContainmentPolicies: currentLockdown.containmentPolicies,
    initialCapabilityImprovements: []
};
