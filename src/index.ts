import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback } from './view/feedback';
import { showEvent } from './view/event';
import { GameController } from './controller/GameController';
import { compileAssets } from './assets/feedback';
import { StoryEvents } from './assets/StoryEvents';

$(window).on('load', () => {

    // Initialise assets
    const feedbackAssets = compileAssets(); // compile feedback assets into usable HTML elements

    // Initialise game engine
    const narrative = StoryEvents;
    const gameController = new GameController(narrative);

    // Await player response
    function playerResponse(responseId: string) {
        // Carry out player's response
        const feedback = gameController.respondToEvent(responseId);

        // Show feedback to player
        showFeedback(
            [
                document.createTextNode(feedback), // Specific feedback from event
                feedbackAssets.publicSupport.low[0], // Examples of emergent feedback
                feedbackAssets.businessSupport.low[0],
                feedbackAssets.healthcareSupport.low[0]
            ], 
            gameController.nextTurn // Button to call nextTurn function
        );
    }
    
    // Show first event
    const nextTurn = gameController.nextTurn();
    showEvent(nextTurn[0], playerResponse);

});
