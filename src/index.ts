import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback } from './view/feedback';
import { showEvent } from './view/event';
import { compileAssets } from './assets/feedback';
import { storyEvents } from './assets/events';

$(window).on('load', () => {
    // Event screen (triggered below)
    function exampleOfEvent() {
        // Get event
        const evt = storyEvents.evtVaccineDeployed;

        // Show event
        showEvent(evt);

        // Temporary example of looping gameplay by just assigning trigger for event button here
        $('.btn-response').click(function () {
            // Show player choice
            let h = document.createElement('H3');
            h.innerHTML = `You made $PLAYER_CHOICE in $EVENT`;
            h.style.color = `white`;
            h.className = 'm-2';
            showFeedback([h]);

            // Trigger feedback
            exampleOfFeedback();
        });
    }

    // Feedback screen
    function exampleOfFeedback() {
        // Compile feedback assets into usable HTML elements
        const feedbackAssets = compileAssets(); // dictionary of arrays

        // Select feedback assets to disaplay
        const groupOfAssetsToTest = [];
        groupOfAssetsToTest.push(feedbackAssets.publicSupport.low[0]);
        groupOfAssetsToTest.push(feedbackAssets.publicSupport.low[1]);
        groupOfAssetsToTest.push(feedbackAssets.businessSupport.low[0]);
        groupOfAssetsToTest.push(feedbackAssets.healthcareSupport.low[0]);

        // Add button to continue to next month
        let btnEle = document.createElement('BUTTON');
        btnEle.className = `btn btn-lg btn-continue`;
        btnEle.innerHTML = `Continue to next month <i class="fas fa-arrow-right"></i>`;
        btnEle.onclick = function () {
            // Trigger event
            exampleOfEvent();
            $(btnEle).hide(); // Disable button
        };
        groupOfAssetsToTest.push(btnEle);

        // Show list of items as feedback
        showFeedback(groupOfAssetsToTest);
    }
    exampleOfFeedback();

    // Splash screen (hidden for testing)
    $('#splash').hide();
    // $('#dismiss-splash').click(function(){ $('#splash').hide() });
});
