import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback, showReputation } from './view/feedback';
import { showEvent } from './view/event';
import { GameController, isGameState } from './controller/GameController';
import { StoryEvents } from './assets/StoryEvents';
import { CompletedEvent } from './model/Events';

$(window).on('load', () => {
    // Initialise game engine
    const narrative = StoryEvents;
    const gameController = new GameController(narrative);

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
        showFeedback(competedEvent.event.name, competedEvent.feedback, onNextTurn);
    };

    // Call next turn
    const nextTurn = () => {
        const nextTurn = gameController.nextTurn();
        const gameState = gameController.currentGameState;

        if (isGameState(nextTurn)) {
            // TODO: handle game end (actual ending, choices per event)
            $('#endscreen').modal('show');
        } else {
            if (nextTurn.length > 1) {
                throw new Error('Expecting a single event for now');
                alert('Error, check console');
            }
            showEvent(nextTurn[0], onResponse, gameState);
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
});
