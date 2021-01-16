// Function to return a properly formatted feedback item
function formatFeedbackItem(key, content){
    return `<p class='feedback-${key}'>${content}</p>`;
}

// Function to select generic assets as they emerge from the world state
function generateEmergentFeedback(publicSupport, businessSupport, healthcareSupport){
    const feedbackItems = [];

    const valuesToFeedback = {
        'publicSupport': publicSupport,
        'businessSupport': businessSupport,
        'healthcareSupport': healthcareSupport
    };

    for(const [key, value] of Object.entries(valuesToFeedback)) {
        console.log(emergentAssets, key, value, emergentAssets[key][value])
        const ele = formatFeedbackItem(key, `${emergentAssets[key][value].shift()}`)
        feedbackItems.push(ele);
    }

    return feedbackItems;
}

/*
    Write feedback to social feedback space e.g., news clippings and tweets in response to your in game choices
*/
export function showFeedback(publicSupport, businessSupport, healthcareSupport, specificFeedback = null) {
    // Create specific and emergent feedback
    if (specificFeedback) {
        const i = formatFeedbackItem(specificFeedback.key, specificFeedback.content);
        document.getElementById('media-feed').appendChild(i);
    }
    const emergentFeedback = generateEmergentFeedback(publicSupport, businessSupport, healthcareSupport);
    emergentFeedback.forEach((i) => document.getElementById('media-feed').appendChild(i));
}

function createFeedback