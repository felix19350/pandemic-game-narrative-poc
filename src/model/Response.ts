import { Feedback } from './Feedback';
import { GameState, Indicators } from './GameState';

export interface Response {
    id: string;
    eventId: string;
    name: string;
    label: Array<string>;
    isApplicable: (gameState: GameState) => boolean;
    onSelect: (gameState: GameState) => ResponseSelectionResult;
}

export interface ResponseSelectionResult {
    updatedIndicators: Indicators;
    feedback: Feedback;
}
