import { createStoryTree } from './tree';
import * as $ from 'jquery';
import { GameState } from '@src/model/GameState';

// Show end screen components

export const showEndScreen = (gameState: GameState) => {

    // Get player choices
    const choices = [
        gameState.responseHistory[0].responses[0].response.eventId,
        gameState.responseHistory[1].responses[0].response.eventId,
        gameState.responseHistory[2].responses[0].response.eventId
    ]
    
    // Show endings
    $('#endscreen').modal('show');
    $('#show-tree').click( function() {
        $('#tree').modal('show'); // Show svg
        createStoryTree(choices); // Draw tree to svg
    });
    
}
