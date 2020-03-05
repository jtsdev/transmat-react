
import { HIDE_OVERLAYS, DEFAULT_INTERFACE, SWITCH_TO_BACK, SWITCH_TO_FRONT,
         SHOW_ABOUT, SHOW_SETTINGS, SHOW_LOGOUT, SHOW_PROGRESS, SHOW_LOADOUTS, SHOW_TOWER,
         SHOW_ACTIONS, SHOW_DETAILS,
         SUBCLASS_FOCUS                                                                     } from '../../actions'


export const overlays = ( state = 'none', action ) => {

    switch ( action.type ) {

        case SHOW_ABOUT:            return setOverlays( state, 'about' );
        case SHOW_SETTINGS:         return setOverlays( state, 'settings' );
        case SHOW_LOGOUT:           return setOverlays( state, 'logout' );

        case SHOW_PROGRESS:         return setOverlays( state, 'progress' );
        case SHOW_LOADOUTS:         return setOverlays( state, 'loadouts' );
        case SHOW_TOWER:            return setOverlays( state, 'tower' );

        case SHOW_ACTIONS:          return setOverlays( state, 'actions' );
        case SHOW_DETAILS:          return setOverlays( state, 'details' );

        case SUBCLASS_FOCUS:        return setOverlays( state, 'subclass' );

        case HIDE_OVERLAYS:         return setOverlays( state, 'none' );
        case DEFAULT_INTERFACE:     return setOverlays( state, 'none' );
        case SWITCH_TO_FRONT:       return setOverlays( state, 'none' );
        case SWITCH_TO_BACK:        return setOverlays( state, 'none' );

        default:

            return state

    }

};


function setOverlays( state, type ) {

    let newState = Object.assign( {}, state );

    newState = type;

    return newState;

}