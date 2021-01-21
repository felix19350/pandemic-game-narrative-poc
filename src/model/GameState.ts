import { Response, ResponseSelectionResult } from './Response';

export interface GameState {
    turnNumber: number;
    indicators: Indicators;
    responseHistory: ResponseHistory[];
}

export interface Indicators {
    reputation: Reputation[];
    publicSupport: number; // negative numbers indicate disapproval, positive numbers approve
    businessSupport: number;
    healthcareSupport: number;
    lockdownEffectiveness: number; // 0 = lockdown lifted, 1 = lockdown in effect, 0.8 = lockdown in effect but less effective
    vaccineEffectiveness: number;
}

export interface ResponseHistory {
    responses: { response: Response; result: ResponseSelectionResult }[];
}

export interface Reputation {
    id: string;
    name: string;
    icon: string;
    description: string;
}