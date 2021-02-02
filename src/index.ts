import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback, showReputation } from './view/feedback';
import { showEvent } from './view/event';
import { GameController } from './controller/GameController';
import { StoryEvents } from './assets/StoryEvents';
import { EndOfTurnSummary } from './model/Events';
import { showEndScreen } from './view/endgame';
import { UK } from './scenarios/UK';

$(window).on('load', () => {

    // Initialise game engine
    const narrative = StoryEvents;
    const gameController = new GameController(UK, narrative);

    // Await player response
    const onResponse = (responseId: string) => {
        // Carry out player's response
        const endOfTurnSummary: EndOfTurnSummary = gameController.respondToEvent(responseId);

        // Hide event
        $('#event-modal').modal('hide');

        // Show a reputation or just feedback
        if (endOfTurnSummary.history.thisMonth.indicators.reputation.length > 0) {
            // Show reputation then feedback
            showReputation(endOfTurnSummary.history.thisMonth.indicators.reputation);
            $('#dismiss-reputation').one('click', function () {
                playerFeedback(endOfTurnSummary, nextTurn);
            }); // TO-DO: Make it so that this doesn't continually trigger after getting a reputation
        } else {
            // Show feedback to response
            playerFeedback(endOfTurnSummary, nextTurn);
        }
    };

    // Give feedback to player
    const playerFeedback = (endOfTurnSummary: EndOfTurnSummary, onNextTurn: Function) => {
        console.log(endOfTurnSummary)
        showFeedback(endOfTurnSummary, onNextTurn);
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
