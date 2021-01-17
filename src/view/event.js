import * as $ from 'jquery';

function createResponse(response) {
    // Create container
    const div = document.createElement('DIV');
    document.getElementById('event-responses').appendChild(div);

    // Add response buttons
    const btn = document.createElement('BUTTON');
    btn.innerHTML = response.name;
    btn.className = 'btn btn-response';
    btn.onclick = function () {
        $('#event-modal').modal('hide');
        console.log('player choice made');
        // THEN {make effect of chosing this response}
    };
    div.appendChild(btn);

    // Add descriptions for the effects of this response
    const UL = document.createElement('UL');
    div.appendChild(UL);
    response.effects.forEach(function (effect) {
        const LI = document.createElement('LI');
        LI.innerHTML = effect;
        UL.appendChild(LI);
    });
}

/*
    Populate event and show to player

        Arguments
        ------------
        evt = 
        {
            name,
            description,
            responses: [
                {
                    name,
                    description: [descriptions of each effect (array)]
                },
            ]
        }
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
