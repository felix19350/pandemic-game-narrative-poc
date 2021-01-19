import { Event } from '@src/model/Events';
import { Response } from '@src/model/Response';
import * as $ from 'jquery';

const createResponse = (response: Response, onResponse: Function) => {
    // Create container
    const div = document.createElement('DIV');
    document.getElementById('event-responses').appendChild(div);

    // Add response buttons
    const btn = document.createElement('BUTTON');
    btn.innerHTML = response.name;
    btn.className = 'btn btn-response';
    btn.onclick = function () {
        onResponse(response.id);
        $('#event-modal').modal('hide');
    };
    div.appendChild(btn);

    // Add labels for the effects of this response
    const UL = document.createElement('UL');
    div.appendChild(UL);
    response.label.forEach(function (effect) {
        const LI = document.createElement('LI');
        LI.innerHTML = effect;
        UL.appendChild(LI);
    });
};

/*
    Populate event and show to player
*/
export const showEvent = (date: Date, evt: Event, onResponse: Function) => {
    // Write content to modal
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);

    document.getElementById('date-indicator').innerHTML = `${month}/${year}`;
    document.getElementById('event-title').innerHTML = evt.name;
    document.getElementById('event-description').innerHTML = evt.description;

    // Add responses to modal
    document.getElementById('event-responses').innerHTML = '';
    evt.responses.forEach((response) => createResponse(response, onResponse));

    // Show modal
    $('#event-modal').modal('show');
};
