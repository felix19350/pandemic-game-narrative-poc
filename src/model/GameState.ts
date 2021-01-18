import { Response, ResponseSelectionResult } from './Response';

export interface GameState {
    turnNumber: number;
    indicators: Indicators;
    responseHistory: ResponseHistory[];
}

export interface Indicators {
    reputation: string;
}

export interface ResponseHistory {
    responses: { response: Response; result: ResponseSelectionResult }[];
}
