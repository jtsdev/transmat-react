
import { ITEM_FOCUS,
         DEFAULT_INTERFACE,
         HIDE_OVERLAYS,
         SWITCH_TO_BACK, SWITCH_TO_FRONT } from '../../actions'


export const scannerTarget = ( state = 'none', action ) => {

    switch ( action.type ) {

        case ITEM_FOCUS:        return setScanner( state, action.target );

        case HIDE_OVERLAYS:     return setScanner( state, 'none' );

        case DEFAULT_INTERFACE: return setScanner( state, 'none' );
        case SWITCH_TO_FRONT:   return setScanner( state, 'none' );
        case SWITCH_TO_BACK:    return setScanner( state, 'none' );

        default:

            return state

    }

};



function setScanner( state, slotIndex ) {

    let newState = Object.assign( {}, state );

    newState = slotIndex;

    return newState;

}