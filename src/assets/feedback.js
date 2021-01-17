/*
    Assets to display as feedback when the world is in various states

    Emergent assets
        - assets for when public support is low/high
        - assets for when business support is low/high
        - assets for when healthcare support is low/high
*/

const emergentFeedbackAssets = {
    publicSupport: {
        high: [`Don't understand the hate for our leader. They're doing ok`, `lockdown isn't too bad tbf`],
        low: [
            `#!*% this person.`,
            `Ugh get me out of my house I am so bored`,
            `So sick of this.`,
            `#sodone i mean serious`,
            `FU.`,
            `MORE lockdown? Well, those 'illegal raves' might keep happening... jus' sayin...`,
            `not happy`,
            `WHAT??! DID I JUST HEAR CORRECT`,
            `deleting socials. final message.`
        ]
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

// Turn assets into HTML elements
function formatAssetAsMessage(asset) {
    const ele = document.createElement('P');
    ele.className = 'feedback-message';
    ele.innerHTML = `
        <i class="fas fa-user col-secondary"></i> Username <br>
        ${asset} <br>
        <p class='text-right'>
            ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i>
        </p>
    `;
    return ele;
}
function formatAssetAsNews(asset) {
    const ele = document.createElement('P');
    ele.className = 'feedback-news';
    ele.innerHTML = `<em>Financial times</em><br><hr>${asset}`;
    return ele;
}
function formatAssetAsReport(asset) {
    const ele = document.createElement('P');
    ele.className = 'feedback-report';
    ele.innerHTML = `<em>BMJ</em><br><hr>${asset}`;
    return ele;
}
/*
    Function to turn assets into usable HTML elements for display
*/
export function compileAssets() {
    return {
        publicSupport: {
            high: Array.from(emergentFeedbackAssets.publicSupport.high, (asset) => formatAssetAsMessage(asset)),
            low: Array.from(emergentFeedbackAssets.publicSupport.low, (asset) => formatAssetAsMessage(asset))
        },
        businessSupport: {
            high: Array.from(emergentFeedbackAssets.businessSupport.high, (asset) => formatAssetAsNews(asset)),
            low: Array.from(emergentFeedbackAssets.businessSupport.low, (asset) => formatAssetAsNews(asset))
        },
        healthcareSupport: {
            high: Array.from(emergentFeedbackAssets.healthcareSupport.high, (asset) => formatAssetAsReport(asset)),
            low: Array.from(emergentFeedbackAssets.healthcareSupport.low, (asset) => formatAssetAsReport(asset))
        }
    };
}
