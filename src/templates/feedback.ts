import { generateRandomUsername } from '../assets/SocialMediaUsernames';

export const responseText = `
    <div class='p-2 feedback-response'>
        <h5> {{eventNm}} </h5>
        <h2 class='feedback-response-choice'> {{txt}} </h2>
    </div>
    <div class='p-2 d-flex flex-row justify-content-center'>
        <h5 style='color: ghostwhite'> 
            {{poll.summary}}
        </h5>
    </div>
    <div class='w-100 p-2 d-flex flex-row justify-content-center'>
        <span style='width: {{poll.support}}%; background-color: lightgreen; height: 20px; text-align: center; border-radius: 5px 0 0 5px'> 
            Support {{poll.support}}%
        </span>
        <span style='width: {{poll.dontKnow}}%; background-color: lightgrey; height: 20px; text-align: center;'> 
           {{poll.dontKnow}}%
        </span>
        <span style='width: {{poll.oppose}}%; background-color: coral; height: 20px; text-align: center; border-radius: 0 5px 5px 0'> 
            Oppose {{poll.oppose}}%
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
        <img src='img/exampleGraph.png' style='height: 150px; width: 100%;'>
    </div>
`;
export const news = `
    <div class='feedback-news'>
        <p> <em> Financial times </em> <br> <hr> {{txt}} </p>
        <img src='img/exampleGraph.png' style='height: 150px; width: 100%;'>
    </div>
`;
export const report = `
    <div class='feedback-report'>
        <p> <em> BMJ </em> <br> <hr> {{txt}} </p>
        <img src='img/exampleGraph.png' style='height: 150px; width: 100%;'>
    </div>
`;

export const endTurnButton = `
    <button class='btn btn-lg btn-continue' id='{{id}}'> Continue to next month <i class="fas fa-arrow-right"> </i> </p>
`;
