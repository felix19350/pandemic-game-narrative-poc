/*
    Assets to display as feedback when the world is in various states

    Emergent assets
        - assets for when public support is low/high
        - assets for when business support is low/high
        - assets for when healthcare support is low/high
*/

const emergentFeedbackAssets = {
    publicSupport: {
        high: [`Don't understand the hate for our leader. They're doing ok`],
        low: [`#!*% this person.`]
    },
    businessSupport: {
        high: [`ECONOMY RECOVERING`],
        low: [`CONTINUED COVID-19 MEASURES RISK BIGGEST DEPRESSION SINCE 1960`]
    },
    healthcareSupport: {
        high: [`COVID-19 response gives nurses some much needed and rare downtime as cases reach all time low.`],
        low: [`COVID-19 cases reach all time high!`, `COVID-19 cases rising sharply!`]
    }
};

export function compileAssets() {
    const assets = {
        publicSupport: [],
        businessSupport: [],
        healthcareSupport: []
    };

    Object.entries(emergentFeedbackAssets.publicSupport).forEach(
        (i) => function(){
            const ele = document.createElement('P')
            ele.innerHTML = i.

            assets.push(ele)
        }
    )

    return assets;
}
