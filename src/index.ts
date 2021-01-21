import * as $ from 'jquery';
import 'bootstrap/js/dist/modal';
import { showFeedback } from './view/feedback';
import { showEvent } from './view/event';
import { GameController, isGameState } from './controller/GameController';
import { StoryEvents } from './assets/StoryEvents';

$(window).on('load', () => {

    // Initialise game engine
    const narrative = StoryEvents;
    const gameController = new GameController(narrative);

    // Await player response
    const onResponse = (responseId: string) => {
        const competedEvent = gameController.respondToEvent(responseId); // Carry out player's response
        showFeedback(competedEvent.event.name, competedEvent.feedback, nextTurn); // Show feedback from response
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
