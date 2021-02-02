import { GameState, Indicators, Reputation } from './GameState';
import { Response } from './Response';
import { Feedback } from './Feedback';
import { Simulator } from '@src/simulator/Simulator';
import { SimulatorMetrics } from '@src/simulator/SimulatorModel';

export interface Event {
    id: string;
    name: string;
    description: string;
    canRun: (gameState: GameState) => boolean;
    responses: Response[];
}

export interface EndOfTurnSummary {
    event: Event,
    response: Response,
    history: {
        thisMonth: {
            simulator: SimulatorMetrics[],
            indicators: Indicators,
            feedback: Feedback
        },
        lastMonth: {
            simulator: SimulatorMetrics[],
            indicators: Indicators
        },
        allTime: {
            simulator: SimulatorMetrics[],
            indicators: Indicators
        },
    }
}
