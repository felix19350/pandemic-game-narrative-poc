function generateRandomUsername() {
    return 'exampleUser1';
}

// Feedback
const responseText = `
    <div class='p-2 feedback-response'>
        <h5> {{eventNm}} </h5>
        <h2 class='feedback-response-choice'> {{txt}} </h2>
    </div>
    <div class='p-2 d-flex flex-row justify-content-center'>
        <h5 style='color: ghostwhite'> 
            {{#if support[0] > 50}} The public supported that 
            {{else}} The public opposed that
            {{/if}}
        </h5>
    </div>
    <div class='p-2 d-flex flex-row justify-content-center'>
        <span style='width: {{support[0]*3}}px; background-color: lightgreen; height: 20px; text-align: center; border-radius: 5px 0 0 5px'> 
            Support {{support[0]}}
        </span>
        <span style='width: {{support[1]*3}}px; background-color: grey; height: 20px; text-align: center; border-radius: 0 5px 5px 0'> 
            No opinion {{support[1]}}
        </span>
        <span style='width: {{support[2]*3}}px; background-color: coral; height: 20px; text-align: center; border-radius: 0 5px 5px 0'> 
            Oppose {{support[2]}}
        </span>
    </div>
`;
const message = `
    <div class='feedback-message'>
        <div>    
            <p style='color: #1589FF'> <i class="fas fa-user"></i> ${generateRandomUsername()} </p>
            <p class='text-center' style='font-weight: bold; font-size: 1.2rem;'> {{{txt}}} </p>
            <p class='text-right'> ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i> </p>
        </div>
        <img src='img/exampleGraph.png' style='height: 150px; width: 100%;'>
    </div>
`;
const news = `
    <div class='feedback-news'>
        <p> <em> Financial times </em> <br> <hr> {{txt}} </p>
        <img src='img/exampleGraph.png' style='height: 150px; width: 100%;'>
    </div>
`;
const report = `
    <div class='feedback-report'>
        <p> <em> BMJ </em> <br> <hr> {{txt}} </p>
        <img src='img/exampleGraph.png' style='height: 150px; width: 100%;'>
    </div>
`;

// Buttons
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
const endTurnButton = `
    <button class='btn btn-lg btn-continue' id='{{id}}'> Continue to next month <i class="fas fa-arrow-right"> </i> </p>
`;
