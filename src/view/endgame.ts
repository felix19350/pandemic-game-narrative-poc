import { createStoryTree } from './tree';
import * as $ from 'jquery';
import { GameState } from '@src/model/GameState';

// Show end screen components

export const showEndScreen = (gameState: GameState) => {

    console.log(gameState)
    // Get player choices
    const choices: string[] = [];
    gameState.responseHistory.forEach(e => {
        choices.push(e.responses[0].response.eventId)
    });

    // Show endings
    $('#endscreen').modal('show');
    $('#show-tree').click(function () {
        $('#tree').modal('show'); // Show svg
        createStoryTree(choices); // Draw tree to svg
    });
};
