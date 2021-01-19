import { GameState } from './GameState';
import { Event } from './Events';

export interface NextTurnState {
    date: Date;
    result: Event[] | GameState;
}
