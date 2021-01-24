/*
    Write feedback to social feedback space e.g., news clippings and tweets in response to your in game choices

        Arguments
        ---------
        feedback: Feedback = (array) of HTML objects
*/
import * as $ from 'jquery';
import { Feedback } from '@src/model/Feedback';
import { generateRandomUsername } from '../assets/SocialMediaUsernames';
import { Reputation } from '@src/model/GameState';
import * as Handlebars from 'handlebars';

// Templates for feedback items
const responseToEvent = Handlebars.compile(`
    <div class='p-2 feedback-response'>
        <h5> {{eventNm}} </h5>
        <h2 class='feedback-response-choice'> {{txt}} </h2>
    </div>
`);
const message = Handlebars.compile(`
    <div class='feedback-message'>
        <p style='color: #1589FF'> <i class="fas fa-user"></i> ${generateRandomUsername()} </p>
        <p class='text-center' style='font-weight: bold; font-size: 1.2rem;'> {{{txt}}} </p>
        <p class='text-right'> ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i> </p>
    </div>
`);
const newsArticle = Handlebars.compile(`
    <div class='feedback-news'>
        <p> <em> Financial times </em> <br> <hr> {{txt}} </p>
    </div>
`);
const medicalReport = Handlebars.compile(`
    <div class='feedback-report'>
        <p> <em> BMJ </em> <br> <hr> {{txt}} </p>
    </div>
`);
const endTurnButton = Handlebars.compile(`
    <button class='btn btn-lg btn-continue' id='{{id}}'> Continue to next month <i class="fas fa-arrow-right"> </i> </p>
`);

// Show feedback item to player
function displayOnFeed(template: string){
    const ele = document.createElement('DIV'); // Append to feed
    ele.innerHTML = template;
    document.getElementById('media-feed').appendChild(ele);
    $(ele).css('opacity', 0).animate({ opacity: 1 }, 500); // Animations
    $('body, html').animate({ scrollTop: $(document).height() }, 500);
}

export function showFeedback(eventNm: string, feedback: Feedback, onNextTurn: Function) {
    [
        responseToEvent({eventNm: eventNm, txt: feedback.toResponse}),
        message({txt: feedback.fromPublic }),
        newsArticle({txt: feedback.fromBusiness}),
        medicalReport({txt: feedback.fromHealthcare}),
        endTurnButton({id: `${eventNm}-continue`})
    ].forEach((template, i) => setTimeout( () => displayOnFeed(template), i * 500));
}

export function showReputation(reputation: Reputation[]) {
    const r = reputation[0]; // Select reputation from list
    $('#reputation-title').text(r.name);
    $('#reputation-icon').html(r.icon);
    $('#reputation-description').text(r.description);
    $('#reputation-modal').modal('show');
}
