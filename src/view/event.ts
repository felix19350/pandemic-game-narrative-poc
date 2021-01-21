import { Event } from '@src/model/Events';
import { GameState } from '@src/model/GameState';
import { Response } from '@src/model/Response';
import * as $ from 'jquery';

const createResponse = (response: Response, onResponse: Function, enabled: Boolean) => {
    // Create container
    const div = document.createElement('DIV');
    document.getElementById('event-responses').appendChild(div);

    // Add response buttons
    const btn = document.createElement('BUTTON');
    btn.innerHTML = response.name;
    div.appendChild(btn);
    
    // Check if response is applicable
    if(enabled){ 

        // Enable on-click function
        btn.className = 'btn btn-response';
        btn.onclick = function () {
            onResponse(response.id);
            $('#event-modal').modal('hide');
        };

        // Add labels to describe response effects 
        const UL = document.createElement('UL');
        div.appendChild(UL);
        response.label.forEach(function (effect) {
            const LI = document.createElement('LI');
            LI.innerHTML = effect;
            UL.appendChild(LI);
        });

    } else {

        // Disable and give explanation
        btn.disabled = true; // NOTE: BS disable btn utility so not recognised by ts ?
        btn.className = 'btn btn-response-disabled';
        const UL = document.createElement('UL');
        div.appendChild(UL);
        const LI = document.createElement('LI');
        LI.style.fontWeight = 'bold';
        LI.innerHTML = 'You cannot select this option because of your reputation';
        UL.appendChild(LI);

    }
};

/*
    Populate event and show to player
*/
export const showEvent = (evt: Event, onResponse: Function, gameState: GameState) => {
    // Write content to modal
    document.getElementById('event-title').innerHTML = evt.name;
    document.getElementById('event-description').innerHTML = evt.description;

    // Add responses to modal
    document.getElementById('event-responses').innerHTML = '';
    evt.responses.forEach((response) => createResponse(response, onResponse, response.isApplicable(gameState)));

    // Show modal
    $('#event-modal').modal('show');
};
