import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback, showReputation } from './view/feedback';
import { showEvent } from './view/event';
import { GameController } from './controller/GameController';
import { StoryEvents } from './assets/StoryEvents';
import { CompletedEvent } from './model/Events';
import { showEndScreen } from './view/endgame';
import { UK } from './scenarios/UK';

$(window).on('load', () => {

    // Initialise game engine
    const narrative = StoryEvents;
    const gameController = new GameController(UK, narrative);

    // Await player response
    const onResponse = (responseId: string) => {
        // Carry out player's response
        const competedEvent = gameController.respondToEvent(responseId);

        // Hide event
        $('#event-modal').modal('hide');

        // Show feedback to player
        if (competedEvent.reputation.length > 0) {
            // Show reputation before feedback to response
            showReputation(competedEvent.reputation);
            $('#dismiss-reputation').one('click', function () {
                playerFeedback(competedEvent, nextTurn);
            });
        } else {
            // Show feedback to response
            playerFeedback(competedEvent, nextTurn);
        }
    };

    // Give feedback to player
    const playerFeedback = (competedEvent: CompletedEvent, onNextTurn: Function) => {
        showFeedback({
            name: competedEvent.event.name, 
            feedback: competedEvent.feedback,
            simulator: competedEvent.simulator,
            onNextTurn: onNextTurn
        });
    };

    // Call next turn
    const nextTurn = () => {
        const nextTurn = gameController.nextTurn();
        
        if (nextTurn.endgame) {
            showEndScreen(nextTurn.gameState);
        } else {
            showEvent(nextTurn.nextEvent, onResponse, nextTurn.gameState);
        }
    };

    // Delegated event handler for generated end turn buttons
    $('#media-feed').on('click', 'button', function (e: Event) {
        nextTurn();
        $(e.target).hide();
    });

    // Show first turn
    $('#dismiss-splash').click(() => {
        nextTurn();
        $('#splash').hide();
    });

    //DEV: HIDE SPLASH
    $('#splash').hide();
    nextTurn();
});
