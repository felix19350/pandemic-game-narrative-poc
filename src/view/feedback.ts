/*
    Write feedback to social feedback space e.g., news clippings and tweets in response to your in game choices

        Arguments
        ---------
        feedback: Feedback = (array) of HTML objects
*/
import * as $ from 'jquery';
import { Feedback } from '@src/model/Feedback';
import { Reputation } from '@src/model/GameState';
import * as Handlebars from 'handlebars';
import { responseText, message, news, report, endTurnButton } from '../templates/UserInterface';

// Show feedback item to player
function compile(template: string, values: any) {
    // Compile template and fill with values
    const t = Handlebars.compile(template);
    return t(values);
}
function append(it: string) {
    // Append to feed
    const ele = document.createElement('DIV');
    ele.innerHTML = it;
    document.getElementById('media-feed').appendChild(ele);
    return ele;
}
function animate(ele: HTMLElement) {
    // Animate entrance into feedback feed
    $(ele).css('opacity', 0).animate({ opacity: 1 }, 500);
    $('body, html').animate({ scrollTop: $(document).height() }, 500);
}

function displayOnFeed(template: string, values: any) {
    const it = compile(template, values);
    const ele = append(it);
    animate(ele);
}

export function showFeedback(eventNm: string, feedback: Feedback, onNextTurn: Function) {
    [
        { template: responseText, values: { eventNm: eventNm, txt: feedback.toResponse } },
        { template: message, values: { txt: feedback.fromPublic } },
        { template: news, values: { txt: feedback.fromBusiness } },
        { template: report, values: { txt: feedback.fromHealthcare } },
        { template: endTurnButton, values: { id: `${eventNm}-continue` } }
    ].forEach((o, i) => setTimeout(() => displayOnFeed(o.template, o.values), i * 500));
}

export function showReputation(reputation: Reputation[]) {
    const r = reputation[0]; // Select reputation from list
    $('#reputation-title').text(r.name);
    $('#reputation-icon').html(r.icon);
    $('#reputation-description').text(r.description);
    $('#reputation-modal').modal('show');
}
