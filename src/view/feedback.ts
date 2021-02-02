/*
    Write feedback to social feedback space g., news clippings and tweets in response to your in game choices

        Arguments
        ---------
        feedback: Feedback = (array) of HTML objects
*/
import * as $ from 'jquery';
import { CollectionOfFeedback, Feedback } from '@src/model/Feedback';
import { Reputation } from '@src/model/GameState';
import { compile } from '../templates/export';
import { responseText, message, news, report, endTurnButton } from '../templates/feedback';
import { EndOfTurnSummary } from '@src/model/Events';
import { createGraph } from './charts';
import { lockdown } from '@src/simulator/PlayerActions';

// Show feedback item to player
function displayOnFeed(template: HTMLElement) {
    document.getElementById('media-feed').appendChild(template);
    $('body, html').animate({ scrollTop: $(document).height() }, 500); // Animations
    $(template).css('opacity', 0).animate({ opacity: 1 }, 500); 
}

function animate(id: string, data){
    console.log(data)
    for(const [key, value] of Object.entries(data)){
        $(`#${id}-${key}`).delay(500).animate(value, 500);
    }
}

export function showFeedback(endOfTurnSummary: EndOfTurnSummary, onNextTurn: Function){
    const support = endOfTurnSummary.history.thisMonth.indicators.poll.support;
    const thisEvent = endOfTurnSummary.event;
    const responseFeedback = endOfTurnSummary.history.thisMonth.feedback;
    const monthlyChangeInCases = endOfTurnSummary.history.thisMonth.simulator
        .map(it => it.dailyChangeInCases)
        .reduce((a, b) => a + b);
    const monthlyMedicalCosts = endOfTurnSummary.history.thisMonth.simulator
        .map(it => it.medicalCosts + it.deathCosts)
        .reduce((a, b) => a + b);
    const monthlyLockdownCosts = endOfTurnSummary.history.thisMonth.simulator
        .map(it => it.economicCosts)
        .reduce((a, b) => a + b);
    console.log(monthlyMedicalCosts, monthlyLockdownCosts)
    
    // Compile feedback items and show to player on social feed
    const collectionOfFeedback: CollectionOfFeedback[] = [
        {
            id: `${thisEvent.id}-summ`, 
            name: 'Summary of player response',
            template: compile(responseText, { 
                id: `${thisEvent.id}-summ`,
                name: thisEvent.name, 
                txt: responseFeedback.toResponse,
                isRising: (( 50 - support) < 0 ),
                data: {
                    support: support,
                    oppose: endOfTurnSummary.history.thisMonth.indicators.poll.oppose,
                    dontKnow: 100 - endOfTurnSummary.history.thisMonth.indicators.poll.oppose - support
                }
            }),
            hasGraph: false,
            dataForGraph: null,
            hasAnimation: true,
            dataForAnimation: {
                support: {width: `${support}%`},
                dontKnow: {width: `${100 - endOfTurnSummary.history.thisMonth.indicators.poll.oppose - support}%`},
                oppose: {width: `${endOfTurnSummary.history.thisMonth.indicators.poll.oppose}%`}
            }
        },
        {
            id: `${thisEvent.id}-msg`, 
            name: 'Public support feedback',
            template: compile(message, { 
                id: `${thisEvent.id}-msg`, 
                txt: responseFeedback.fromPublic,
                isRising: (( 50 - support) >= 0 ),
                data: 50 - support
            }),
            hasGraph: true,
            dataForGraph: [50, support],
            hasAnimation: false,
            dataForAnimation: null
        },
        {
            id: `${thisEvent.id}-news`, 
            name: 'Economic feedback',
            template: compile(news, { 
                id: `${thisEvent.id}-news`, 
                txt: responseFeedback.fromBusiness ,
                data: {
                    medicalCosts: monthlyMedicalCosts,
                    lockdownCosts: monthlyLockdownCosts
                }
            }),
            hasGraph: false,
            dataForGraph: null,
            hasAnimation: false,
            dataForAnimation: null
        },
        {
            id: `${thisEvent.id}-report`, 
            name: 'Healthcare feedback',
            template: compile(report, { 
                id: `${thisEvent.id}-report`, 
                txt: responseFeedback.fromHealthcare,
                data: monthlyChangeInCases,
                isRising: ( monthlyChangeInCases >= 0)
            }),
            hasGraph: false,
            dataForGraph: null,
            hasAnimation: false,
            dataForAnimation: null
        },
        {
            id: `${thisEvent.id}-continue`, 
            name: 'End turn button',
            template: compile(endTurnButton, { id: `${thisEvent.id}-continue` }),
            hasGraph: false,
            dataForGraph: null,
            hasAnimation: false,
            dataForAnimation: null
        }   
    ]
    
    collectionOfFeedback.forEach((it, i) => setTimeout(
        function() {
            displayOnFeed(it.template);
            if(it.hasGraph){ createGraph(it.dataForGraph, it.id) };
            if(it.hasAnimation){ animate(it.id, it.dataForAnimation) };
        }, i * 500
    ));

}

export function showReputation(reputation: Reputation[]) {
    const r = reputation[0]; // Select reputation from list
    $('#reputation-title').text(r.name);
    $('#reputation-icon').html(r.icon);
    $('#reputation-description').text(r.description);
    $('#reputation-modal').modal('show');
}
