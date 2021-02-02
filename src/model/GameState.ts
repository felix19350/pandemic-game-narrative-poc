import { Response, ResponseSelectionResult } from './Response';
import {ContainmentPolicy, SimulatorMetrics} from '../simulator/SimulatorModel';

export interface GameState {
    turnNumber: number;
    indicators: Indicators;
    responseHistory: ResponseHistory[];
}

export interface Indicators {
    reputation: Reputation[];
    support: number;
    poll: {support: number, oppose: number}; // negative numbers indicate disapproval, positive numbers approve
    containmentPolicies: ContainmentPolicy[];
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
