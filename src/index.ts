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

        // Show feedback to player
        if ( competedEvent.reputation.length > 0 ) {  // Show reputation before feedback to response
            showReputation(competedEvent.reputation)
            $('#dismiss-reputation').one('click', function(){ playerFeedback(competedEvent, nextTurn) })
        } else { // Show feedback to response
            playerFeedback(competedEvent, nextTurn);
        }

    };

   // Give feedback to player
    const playerFeedback = (competedEvent: CompletedEvent, onNextTurn: Function) => { 
        showFeedback(competedEvent.event.name, competedEvent.feedback, onNextTurn) 
    }

    // Call next turn
    const nextTurn = () => {
        const nextTurn = gameController.nextTurn();
        const gameState = gameController.currentGameState;

        if (isGameState(nextTurn)) {
            // TODO: handle game end (actual ending, choices per event)
            alert('Yay! Done!');
        } else {
            if (nextTurn.length > 1) {
                throw new Error('Expecting a single event for now');
                alert('Error, check console');
            }
            showEvent(nextTurn[0], onResponse, gameState);
        }
    };

    // Show first turn
    nextTurn();
});
