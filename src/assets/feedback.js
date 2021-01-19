/*
    Assets to display as feedback when the world is in various states

    Emergent assets
        - assets for when public support is low/high
        - assets for when business support is low/high
        - assets for when healthcare support is low/high
*/

const emergentFeedbackAssets = {
    publicSupport: {
        high: [
            `<i class="fas fa-hand-peace"></i>`,
            `Finally on the right track <i class="fas fa-subway"></i>`,
            `We were already giving this virus too much attention anyway`,
            `#people #wellbeing first`
        ],
        low: [
            `<i class="fas fa-hand-middle-finger"></i>.`,
            `So sick of this.`,
            `<i class="fas fa-meh-rolling-eyes"></i> - me this year`,
            `really? THAT was your response?!`
        ]
    },
    businessSupport: {
        high: [
            `ECONOMY STARTS RECOVERING`,
            `LENDERS START TO SEE RETURNS ON PANDEMIC LOANS`,
            `MORE PEOPLE ARE BUYING HOUSES; INDICATIVE OF FINANCIAL STABILITY`,
            `CONFIDENCE IN ACHIEVING A STABLE ECONOMY RISES`
        ],
        low: [
            `CONTINUED COVID-19 MEASURES RISK BIGGEST DEPRESSION YET`,
            `PANDEMIC TRIGGERS GLOBAL RECESSION`,
            `COMPANIES REPORT 'UNPROFITABLE CONDITIONS'`,
            `COMPANIES FACE LOGISTICAL ISSUES RELATED TO COVID-19`
        ]
    },
    healthcareSupport: {
        high: [
            `COVID-19 response gives nurses some much needed and rare downtime as cases drop.`,
            `COV-SARS-19 cases dip to all time low`,
            `New cases drop; fewer people ill each day`
        ],
        low: [
            `COVID-19 cases reach all time high!`,
            `COVID-19 cases rising sharply!`,
            `'I worked 40 hours yesterday': Healthcare workers stressed by new cases`
        ]
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
