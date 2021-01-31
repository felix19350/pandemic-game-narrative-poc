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
import { compile } from '../templates/export';
import {Simulator} from '../simulator/Simulator';
import { responseText, message, news, report, endTurnButton } from '../templates/feedback';

// Show feedback item to player
function displayOnFeed(template: HTMLElement) {
    document.getElementById('media-feed').appendChild(template);
    $(template).css('opacity', 0).animate({ opacity: 1 }, 500); // Animations
    $('body, html').animate({ scrollTop: $(document).height() }, 500);
}

export function showFeedback(e:{
    name: string;
    feedback: Feedback; 
    simulator: Simulator;
    onNextTurn: Function;
}){
    // Graph simulator state
    const examplePublicSupportPollData = {support: 55, dontKnow: 5, oppose: 40, summary: 'The public supported that!'};
    console.log(e.simulator);

    [ // Compile feedback items and show to player on social feed
        compile(responseText, { name: e.name, txt: e.feedback.toResponse, poll: examplePublicSupportPollData}),
        compile(message, { txt: e.feedback.fromPublic }),
        compile(news, { txt: e.feedback.fromBusiness }),
        compile(report, { txt: e.feedback.fromHealthcare }),
        compile(endTurnButton, { id: `${e.name}-continue` })
    ].forEach((template, i) => setTimeout(() => displayOnFeed(template), i * 500));
}

export function showReputation(reputation: Reputation[]) {
    const r = reputation[0]; // Select reputation from list
    $('#reputation-title').text(r.name);
    $('#reputation-icon').html(r.icon);
    $('#reputation-description').text(r.description);
    $('#reputation-modal').modal('show');
}
