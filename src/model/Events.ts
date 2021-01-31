import { GameState, Reputation } from './GameState';
import { Response } from './Response';
import { Feedback } from './Feedback';
import { Simulator } from '@src/simulator/Simulator';

export interface Event {
    id: string;
    name: string;
    description: string;
    canRun: (gameState: GameState) => boolean;
    responses: Response[];
}

export interface CompletedEvent {
    event: Event;
    response: Response;
    simulator: Simulator;
    feedback: Feedback;
    reputation: Reputation[];
}
