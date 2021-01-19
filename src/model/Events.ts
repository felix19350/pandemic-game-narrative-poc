import { GameState } from './GameState';
import { Response } from './Response';

export interface Event {
    id: string;
    name: string;
    description: string;
    canRun: (gameState: GameState) => boolean;
    responses: Response[];
}
