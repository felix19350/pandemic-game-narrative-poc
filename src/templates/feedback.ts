import { generateRandomUsername } from '../assets/SocialMediaUsernames';

export const responseText = `
    <div class='p-2 feedback-response'>
        <h5> {{name}} </h5>
        <h2 class='feedback-response-choice'> {{txt}} </h2>
    </div>
    <div class='p-2 d-flex flex-row justify-content-center'>
        <h5 style='color: ghostwhite'> 
            {{#if isRising}} 'The public supported that!'
            {{else}} 'The public didn't like that!'
            {{/if}} 
        </h5>
    </div>
    <div class='w-100 p-2 d-flex flex-row justify-content-around' style='font-weight: 500;'>
        <span style='width: {{data.support}}%; background-color: lightgreen; height: 20px; text-align: center; border-radius: 5px 0 0 5px'> 
            <i class="fas fa-thumbs-up"></i> {{data.support}}%
        </span>
        <span style='width: {{data.dontKnow}}%; max-width: {{data.dontKnow}}%; background-color: lightgrey; height: 20px; text-align: center; overflow: visible;'> 
           {{data.dontKnow}}%
        </span>
        <span style='width: {{data.oppose}}%; background-color: coral; height: 20px; text-align: center; border-radius: 0 5px 5px 0'> 
            <i class="fas fa-thumbs-down"></i> {{data.oppose}}%
        </span>
    </div>
`;
export const message = `
    <div class='feedback-message'>
        <div>
            <p style='color: #1589FF'> <i class="fas fa-user"></i> ${generateRandomUsername()} </p>
            <p class='text-center' style='font-weight: bold; font-size: 1.2rem;'> {{{txt}}} </p>
            <p class='text-right'> ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i> </p>
        </div>
        <hr>
        <div id='{{id}}' style='max-height: 150px; height: 150px; width: 100%;'></div>
    </div>
`;
export const news = `
    <div class='feedback-news' id='{{id}}'>
        <p> <em> Financial times </em> <br> <hr> {{txt}} </p>
        <p> Medical costs: {{data.medicalCosts}} </p>
        <p> Cost of lockdown: {{data.lockdownCosts}} </p>
        <div id='{{id}}'><img src='img/exampleGraph.png' style='height: 150px; width: 100%;'></div>
    </div>
`;
export const report = `
    <div class='feedback-report' id='{{id}}'>
        <p> <em> BMJ </em> <br> <hr> {{txt}} </p>
        <p {{#if isRising}} style='color: red' {{/if}}> 
            {{#if isRising}} + {{/if}} {{data}} cases this month 
        </p>
        <div id='{{id}}'><img src='img/exampleGraph.png' style='max-height: 150px; height: 150px; width: 100%;'></div>
    </div>
`;

export const endTurnButton = `
    <button class='btn btn-lg btn-continue' id='{{id}}'> Continue to next month <i class="fas fa-arrow-right"> </i> </p>
`;
