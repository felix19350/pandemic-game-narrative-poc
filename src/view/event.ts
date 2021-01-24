import { Event } from '@src/model/Events';
import { GameState } from '@src/model/GameState';
import { Response } from '@src/model/Response';
import * as $ from 'jquery';
import * as Handlebars from 'handlebars';

const createResponse = (response: Response, onResponse: Function, enabled: boolean) => {
    const html = `
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
    `

    // Create button
    const template = Handlebars.compile(html);
    document.getElementById('event-responses').insertAdjacentHTML('beforeend', template( { r: response, enabled: enabled } ));
    if(enabled){ $(`#${response.id}`).click( function () { onResponse(response.id) } )};
};

/*
    Populate event and show to player
*/
export const showEvent = (evt: Event, onResponse: Function, gameState: GameState) => {
    // Describe event
    document.getElementById('event-title').innerHTML = evt.name;
    document.getElementById('event-description').innerHTML = evt.description;

    // Add response buttons
    document.getElementById('event-responses').innerHTML = '';
    evt.responses.forEach((response) => createResponse(response, onResponse, response.isApplicable(gameState)));

    // Show modal
    $('#event-modal').modal('show');
};
