import * as $ from 'jquery';

function createResponse(response, playerResponse) {
    // Create container
    const div = document.createElement('DIV');
    document.getElementById('event-responses').appendChild(div);

    // Add response buttons
    const btn = document.createElement('BUTTON');
    btn.innerHTML = response.name;
    btn.className = 'btn btn-response';
    btn.onclick = function () {
        playerResponse(response.id);
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
export function showEvent(evt, playerResponse) {
    console.log(evt)
    // Write content to modal
    document.getElementById('event-title').innerHTML = evt.name;
    document.getElementById('event-description').innerHTML = evt.description;

    // Add responses to modal
    document.getElementById('event-responses').innerHTML = '';
    evt.responses.forEach((response) => createResponse(response, playerResponse));

    // Show modal
    $('#event-modal').modal('show');
}
