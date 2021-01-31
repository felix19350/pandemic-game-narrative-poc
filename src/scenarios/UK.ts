import { Scenario } from '@src/simulator/SimulatorModel';

export const GDP_Uk = 2.8e12; // 2.8 trillion UK gdp source: https://www.google.com/search?sxsrf=ALeKk01S5_HLcnpJFgfGjmYjN2t1XLmflw%3A1612101247616&ei=f7YWYPudJfGEhbIPyM-I4AE&q=uk+gdp&oq=uk+gdp&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIICAAQsQMQkQIyBAgAEEMyAggAMgQIABBDMgQIABBDMgUIABCxAzIECAAQQzICCAAyAggAOgcIABBHELADOgQIABBHUIkHWNkHYMUIaAFwAngAgAFwiAFwkgEDMC4xmAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwi72dKRqcbuAhVxQkEAHcgnAhwQ4dUDCA0&uact=5

export const UK: Scenario = {
    totalPopulation: 66650000, // 66 million people UK population source: https://www.google.com/search?sxsrf=ALeKk01y7DAKcHDVprTj0dCWJ3VpMfO7_Q%3A1612101308264&ei=vLYWYKLZD6CDhbIP38q82Ag&q=uk+population&oq=uk+population&gs_lcp=CgZwc3ktYWIQAzIFCAAQsQMyCAgAELEDEIMBMgUIABCRAjICCAAyCAgAELEDEIMBMgYIABAHEB4yAggAMgIIADICCAAyAggAOgQIABBHOggIABAHEAoQHjoICAAQCBAHEB46BAgjECc6CwgAELEDEIMBEJECOggIABCxAxCRAjoHCAAQsQMQQ1COFVjjHGC-HWgAcAN4AIABU4gBhwSSAQE3mAEAoAEBqgEHZ3dzLXdpesgBCMABAQ&sclient=psy-ab&ved=0ahUKEwiip8iuqcbuAhWgQUEAHV8lD4sQ4dUDCA0&uact=5
    initialNumInfected: 53285, // New daily cases Jan 1st for UK, source: https://github.com/CSSEGISandData/COVID-19
    initialMedicalCosts: 1252215000,
    initialEconomicCosts: 10576809135,
    initialDeathCosts: 19173932258,
    r0: 3.42, 
    // start in winter + new more infectious strain 
    // seasonality = +/-0.2 R (source as below)
    // estimated R = 3.22 (with no countermeasures https://covid19-scenarios.org/?q=~%28ageDistributionData~%28data~%28~%28ageGroup~%270-9~population~8044056%29~%28ageGroup~%2710-19~population~7642475%29~%28ageGroup~%2720-29~population~8558707%29~%28ageGroup~%2730-39~population~9295025%29~%28ageGroup~%2740-49~population~8604251%29~%28ageGroup~%2750-59~population~9173467%29~%28ageGroup~%2760-69~population~7286778%29~%28ageGroup~%2770-79~population~5830636%29~%28ageGroup~%2780%2A2b~population~3450616%29%29~name~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland%29~scenarioData~%28data~%28epidemiological~%28hospitalStayDays~3~icuStayDays~14~infectiousPeriodDays~3~latencyDays~3~overflowSeverity~2~peakMonth~0~r0~%28begin~2.9~end~3.54%29~seasonalForcing~0.4%29~mitigation~%28mitigationIntervals~%28~%28color~%27%2A23000~name~%27%2A231~timeRange~%28begin~%272021-01-31T15%2A3a40%2A3a41.835Z~end~%272021-02-28T15%2A3a40%2A3a41.835Z%29~transmissionReduction~%28begin~77~end~87%29%29%29%29~population~%28ageDistributionName~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland~caseCountsName~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland~hospitalBeds~139647~icuBeds~4114~importsPerDay~0.1~initialNumberOfCases~12380~populationServed~66488991~seroprevalence~10.86%29~simulation~%28numberStochasticRuns~15~simulationTimeRange~%28begin~%272021-01-31T00%2A3a00%2A3a00.000Z~end~%272021-02-28T15%2A3a40%2A3a41.835Z%29%29%29~name~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland%29~schemaVer~%272.2.0~severityDistributionData~%28data~%28~%28ageGroup~%270-9~confirmed~5~critical~5~fatal~30~isolated~0~palliative~0~severe~1%29~%28ageGroup~%2710-19~confirmed~5~critical~10~fatal~30~isolated~0~palliative~0~severe~3%29~%28ageGroup~%2720-29~confirmed~10~critical~10~fatal~30~isolated~0~palliative~0~severe~3%29~%28ageGroup~%2730-39~confirmed~15~critical~15~fatal~30~isolated~0~palliative~0~severe~3%29~%28ageGroup~%2740-49~confirmed~20~critical~20~fatal~30~isolated~0~palliative~0~severe~6%29~%28ageGroup~%2750-59~confirmed~25~critical~25~fatal~40~isolated~0~palliative~0~severe~10%29~%28ageGroup~%2760-69~confirmed~30~critical~35~fatal~40~isolated~0~palliative~0~severe~25%29~%28ageGroup~%2770-79~confirmed~40~critical~45~fatal~50~isolated~0~palliative~0~severe~35%29~%28ageGroup~%2780%2A2b~confirmed~50~critical~55~fatal~50~isolated~0~palliative~0~severe~50%29%29~name~%27China%2A20CDC%29%29&v=1
    importedCasesPerDay: 0.1,
    hospitalCapacity: 128935, // 250k total hospital beds source: https://www.nuffieldtrust.org.uk/resource/hospital-bed-occupancy#:~:text=Between%20Q1%202010%2F11%20and,%25%20in%20Q4%202019%2F20.
    runUpPeriod: [], // Disable run-up period
    gdpPerDay: GDP_Uk / 365.0,
    power: 1,
    distr_family: 'nbinom',
    dynamics: 'SIS',
    mortality: 0.01,
    time_lumping: false,
    initialContainmentPolicies: [],
    initialCapabilityImprovements: [],
    baseImmunity: 0.1086,
    dailyIncreaseInImmunity: 0.0022
    /* Calculation for effectiveVaccinations:
        
        Base immunity: 10.86% 

        8M first doses at 50% effectiveness
        = 4,000,000 immune per month
        500K second doses at 95% effectiveness
        = 475,000 immune per month

        == 6.7% of the population effectively vaccinated per month
        == 0.22% per day

        Sources:
        base immunity -- https://covid19-scenarios.org/?q=~%28ageDistributionData~%28data~%28~%28ageGroup~%270-9~population~8044056%29~%28ageGroup~%2710-19~population~7642475%29~%28ageGroup~%2720-29~population~8558707%29~%28ageGroup~%2730-39~population~9295025%29~%28ageGroup~%2740-49~population~8604251%29~%28ageGroup~%2750-59~population~9173467%29~%28ageGroup~%2760-69~population~7286778%29~%28ageGroup~%2770-79~population~5830636%29~%28ageGroup~%2780%2A2b~population~3450616%29%29~name~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland%29~scenarioData~%28data~%28epidemiological~%28hospitalStayDays~3~icuStayDays~14~infectiousPeriodDays~3~latencyDays~3~overflowSeverity~2~peakMonth~0~r0~%28begin~2.9~end~3.54%29~seasonalForcing~0.4%29~mitigation~%28mitigationIntervals~%28~%28color~%27%2A23000~name~%27%2A231~timeRange~%28begin~%272021-01-31T15%2A3a18%2A3a31.138Z~end~%272021-02-28T15%2A3a18%2A3a31.138Z%29~transmissionReduction~%28begin~77~end~87%29%29%29%29~population~%28ageDistributionName~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland~caseCountsName~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland~hospitalBeds~139647~icuBeds~4114~importsPerDay~0.1~initialNumberOfCases~12380~populationServed~66488991~seroprevalence~10.86%29~simulation~%28numberStochasticRuns~15~simulationTimeRange~%28begin~%272021-01-31T00%2A3a00%2A3a00.000Z~end~%272021-02-28T15%2A3a18%2A3a31.138Z%29%29%29~name~%27United%2A20Kingdom%2A20of%2A20Great%2A20Britain%2A20and%2A20Northern%2A20Ireland%29~schemaVer~%272.2.0~severityDistributionData~%28data~%28~%28ageGroup~%270-9~confirmed~5~critical~5~fatal~30~isolated~0~palliative~0~severe~1%29~%28ageGroup~%2710-19~confirmed~5~critical~10~fatal~30~isolated~0~palliative~0~severe~3%29~%28ageGroup~%2720-29~confirmed~10~critical~10~fatal~30~isolated~0~palliative~0~severe~3%29~%28ageGroup~%2730-39~confirmed~15~critical~15~fatal~30~isolated~0~palliative~0~severe~3%29~%28ageGroup~%2740-49~confirmed~20~critical~20~fatal~30~isolated~0~palliative~0~severe~6%29~%28ageGroup~%2750-59~confirmed~25~critical~25~fatal~40~isolated~0~palliative~0~severe~10%29~%28ageGroup~%2760-69~confirmed~30~critical~35~fatal~40~isolated~0~palliative~0~severe~25%29~%28ageGroup~%2770-79~confirmed~40~critical~45~fatal~50~isolated~0~palliative~0~severe~35%29~%28ageGroup~%2780%2A2b~confirmed~50~critical~55~fatal~50~isolated~0~palliative~0~severe~50%29%29~name~%27China%2A20CDC%29%29&v=1
        effectiveness -- https://www.bmj.com/content/371/bmj.m4826
        vaccination rate -- https://coronavirus.data.gov.uk/details/vaccinations
    */
};
