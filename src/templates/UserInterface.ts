import { generateRandomUsername } from '../assets/SocialMediaUsernames';

// Feedback
export const responseText = `
    <div class='p-2 feedback-response'>
        <h5> {{eventNm}} </h5>
        <h2 class='feedback-response-choice'> {{txt}} </h2>
    </div>
`;
export const message = `
    <div class='feedback-message'>
        <p style='color: #1589FF'> <i class="fas fa-user"></i> ${generateRandomUsername()} </p>
        <p class='text-center' style='font-weight: bold; font-size: 1.2rem;'> {{{txt}}} </p>
        <p class='text-right'> ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i> </p>
    </div>
`;
export const news = `
    <div class='feedback-news'>
        <p> <em> Financial times </em> <br> <hr> {{txt}} </p>
    </div>
`;
export const report = `
    <div class='feedback-report'>
        <p> <em> BMJ </em> <br> <hr> {{txt}} </p>
    </div>
`;

// Buttons
export const responseButton = `
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
export const endTurnButton = `
    <button class='btn btn-lg btn-continue' id='{{id}}'> Continue to next month <i class="fas fa-arrow-right"> </i> </p>
`;
