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

function showToPlayer(ele: HTMLElement) {
    document.getElementById('media-feed').appendChild(ele); // Append to feed
    $(ele).css('opacity', 0).animate({ opacity: 1 }, 500); // Animations
    $('body, html').animate({ scrollTop: $(document).height() }, 500);
}

function sendResponse(eventNm: string, txt: Feedback['toResponse']) {
    const div = document.createElement('DIV');
    div.className = 'p-2 feedback-response';
    document.getElementById('media-feed').appendChild(div);

    const name = document.createElement('H5');
    name.innerHTML = eventNm;
    div.appendChild(name);
    const choice = document.createElement('H2');
    choice.className = 'feedback-response-choice';
    choice.innerHTML = txt;
    div.appendChild(choice);
}
function sendMessage(txt: Feedback['fromPublic']) {
    const ele = document.createElement('P');
    ele.className = 'feedback-message';
    ele.innerHTML = `
        <p style='color: #1589FF'><i class="fas fa-user"></i> ${generateRandomUsername()} </p>
        <p class='text-center' style='font-weight: bold; font-size: 1.2rem;'>${txt} </p>
        <p class='text-right'>
            ${Math.floor(Math.random() * 100)} <i class="fas fa-heart col-primary"></i>
        </p>
    `;
    showToPlayer(ele);
}
function sendNews(txt: Feedback['fromBusiness']) {
    const ele = document.createElement('P');
    ele.className = 'feedback-news';
    ele.innerHTML = `<em>Financial times</em><br><hr>${txt}`;
    showToPlayer(ele);
}
function sendReport(txt: Feedback['fromHealthcare']) {
    const ele = document.createElement('P');
    ele.className = 'feedback-report';
    ele.innerHTML = `<em>BMJ</em><br><hr>${txt}`;
    showToPlayer(ele);
}
function sendEndTurnBtn(onNextTurn: Function) {
    // Add button to continue to next month
    const ele = document.createElement('BUTTON');
    ele.className = `btn btn-lg btn-continue`;
    ele.innerHTML = `Continue to next month <i class="fas fa-arrow-right"></i>`;
    ele.onclick = function () {
        onNextTurn(); // Next turn
        $(ele).hide(); // Disable btn on click
    };
    showToPlayer(ele);
}

export function showFeedback(eventNm: string, feedback: Feedback, onNextTurn: Function) {
    [
        () => sendResponse(eventNm, feedback.toResponse),
        () => sendMessage(feedback.fromPublic),
        () => sendNews(feedback.fromBusiness),
        () => sendReport(feedback.fromHealthcare),
        () => sendEndTurnBtn(onNextTurn)
    ].forEach((fn, i) => setTimeout(fn, i * 500));
}

export function showReputation(reputation: Reputation[]) {
    const r = reputation[0]; // Select reputation from list
    $('#reputation-title').text(r.name);
    $('#reputation-icon').html(r.icon);
    $('#reputation-description').text(r.description);
    $('#reputation-modal').modal('show');
}
