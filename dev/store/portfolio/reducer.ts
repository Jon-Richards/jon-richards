/**
 * @fileoverview
 * The reducer for the portfolio store.
 */

import { ACTIONS, State } from './mediator';

/** 
 * The Redux reducer for the Portfolio store.  If no params are supplied, a
 * default Portfolio State will be created.
 * @param state An object representing the current state of the Portfolio store.
 * @param action An action creator for updating the supplied state.
 */
export function reducer (
    state: State = { 
        activePieceId: 0,
        message: ''
    },
    action?: 
        | ReturnType<typeof ACTIONS.getPieces>
): State {

    if (action) {
        switch (action.type) {
            case 'PORTFOLIO__GET_PIECES':
                return {
                    ...state,
                    activePieceId: action.id
                };
            default:
                return state;
        }
    }

    return state;
}