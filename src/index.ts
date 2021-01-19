import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback } from './view/feedback';
import { showEvent } from './view/event';
import { GameController, isGameState } from './controller/GameController';
import { compileAssets } from './assets/feedback';
import { StoryEvents } from './assets/StoryEvents';

$(window).on('load', () => {
    // Initialise assets
    const feedbackAssets = compileAssets(); // compile feedback assets into usable HTML elements

    // Initialise game engine
    const narrative = StoryEvents;
    const gameController = new GameController(narrative);

    // Await player response
    const onResponse = (responseId: string) => {
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
            nextTurn // Function for end turn button to call
        );
    };

    // Call next turn
    const nextTurn = () => {
        const nextTurn = gameController.nextTurn();

        if (isGameState(nextTurn)) {
            // TODO: handle game end (actual ending, choices per event)
            alert('Yay! Done!');
        } else {
            if (nextTurn.length > 1) {
                throw new Error('Expecting a single event for now');
                alert('Error, check console');
            }
            showEvent(nextTurn[0], onResponse);
        }
    };

    // Show first turn
    nextTurn();
});
