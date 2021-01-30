$(window).on('load', () => {

    // Import HTML templates from templates.js
    const templates = [responseText, message, news, report, endTurnButton];

    // MAKE SOCIAL FEED
    templates.forEach(function (template) {

        // Optional: Add text into editable template (see how this is done with buttons below)
        // var addText = Handlebars.compile(template);
        // addText = addText({ eventNm: 'exampleName', txt: 'exampleText', id: 'exampleID' });

        // Convert into HTML element so we can put it on the page
        const div = document.createElement('DIV');
        div.innerHTML = template;
        document.getElementById('media-feed').appendChild(div);
    });

    // MAKE REPUTATION SCREEN
    $('#reputation-title').text('Flip-Flopper');
    $('#reputation-icon').html('<i class="fas fa-socks"></i>');
    $('#reputation-description').text('You were given the reputation of flip flopper');

    // MAKE EVENT SCREEN
    
    // a - Add text
    document.getElementById('event-title').innerHTML = 'event name';
    document.getElementById('event-description').innerHTML = 'event description';

    // b - Create button 1
    var addText = Handlebars.compile(responseButton); // Get template
    var div = document.createElement('DIV'); // Edit and put on page
    div.innerHTML = addText({
        // Text in button
        r: {
            id: 'exampleId',
            name: 'exampleName',
            label: ['effect1', 'effect2']
        },
        enabled: true // if enabled shows as normal button
    });
    document.getElementById('event-responses').appendChild(div);

    // c - Create button 2
    var addText = Handlebars.compile(responseButton); // Get template
    var div = document.createElement('DIV'); // Edit and put on page
    div.innerHTML = addText({
        // Text in button
        r: {
            id: 'exampleId2',
            name: 'exampleName2',
            label: ['effect2-1', 'effect2-2', 'effect2-3']
        },
        enabled: false // if disabled shows as disabled
    });
    document.getElementById('event-responses').appendChild(div);

});


