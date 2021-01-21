import { GameState, Reputation } from './GameState';
import { Response } from './Response';
import { Feedback } from './Feedback';

export interface Event {
    id: string;
    name: string;
    description: string;
    canRun: (gameState: GameState) => boolean;
    responses: Response[];
}

export interface CompletedEvent {
    event: Event,
    response: Response,
    feedback: Feedback,
    reputation: Reputation[]
}