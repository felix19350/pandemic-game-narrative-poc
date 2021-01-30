function generateRandomUsername() {
    return 'exampleUser1';
}

// Feedback
// Yellow event choice summary text at top
const responseText = `
    <div class='p-2 feedback-response'>
        <h5> {{eventNm}} </h5>
        <h2 class='feedback-response-choice'> {{txt}} </h2>
    </div>
`;
// Social media message
const message = `
    <div class='feedback-message'>
        <p style='color: #1589FF'> <i class="fas fa-user"></i> ${generateRandomUsername()} </p>
        <p class='text-center' style='font-weight: bold; font-size: 1.2rem;'> {{{txt}}} </p>
        <p class='text-right'> ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i> </p>
    </div>
`;
// news report on economy
const news = `
    <div class='feedback-news'>
        <p> <em> Financial times </em> <br> <hr> {{txt}} </p>
    </div>
`;
// healthcare report
const report = `
    <div class='feedback-report'>
        <p> <em> BMJ </em> <br> <hr> {{txt}} </p>
    </div>
`;
// end turn button at bottom of the feed
const endTurnButton = `
    <button class='btn btn-lg btn-continue' id='{{id}}'> Continue to next month <i class="fas fa-arrow-right"> </i> </p>
`;

// Events
// Template for the event in general is on the HTML
// Event response button
const responseButton = `
    <div>
        <button class='btn btn-response' 
            {{#if enabled}} id='{{r.id}}' {{else}} disabled {{/if}}>
            {{r.name}} 
        </button>
        <ul class='effect-list'>
            {{#if enabled}} {{#each r.label}} <li> {{this}} </li> {{/each}}
            {{else}} You cannot select this option because of your reputation as a Flip-Flopper <i class="fas fa-socks"></i> {{/if}}
        </ul>
    </div>
`;
