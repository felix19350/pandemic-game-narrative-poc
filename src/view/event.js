import * as $ from 'jquery';

function createResponse(response) {

    const div = document.createElement('DIV');
    document.getElementById('event-responses').appendChild(div);

    // Response button
    const btn = document.createElement('BUTTON');
    btn.innerHTML = response.name;
    btn.className = 'btn btn-success';
    btn.onclick = function () {
        $('#event-modal').modal('hide');
        console.log('player choice made')
        // then make effect of chosing this response
    }
    div.appendChild(btn);

    // Response text
    const UL = document.createElement('UL');
    div.appendChild(UL);
    response.description.forEach(
        (effect) =>
            function () {
                const LI = document.createElement('LI');
                LI.innerHTML = effect;
                UL.appendChild(LI);
            }
    );
}

/*
    Populate event and show to player
        evt = (see model/events for structure)
*/

export function showEvent(evt) {

    // Write content to modal
    document.getElementById('event-title').innerHTML = evt.name;
    document.getElementById('event-description').innerHTML = evt.description;

    // Add responses to modal
    document.getElementById('event-responses').innerHTML = '';
    evt.responses.forEach((response) => createResponse(response));

    // Show modal
    $('#event-modal').modal('show');
}
