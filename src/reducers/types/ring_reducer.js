
import { HIDE_RINGS,
         LOGIN_RINGS,
         OVERLAYS_RINGS,
         SUBTYPE_RINGS,       SUBTYPE_OPT_RINGS,
         SUBTYPE_FOCUS_RINGS, SUBTYPE_FOCUS_OPT_RINGS,
         ITEM_ACTIONS_RINGS,  ITEM_ACTIONS_OPT_RINGS,
         DEFAULT_INTERFACE,
         GHOST_LEFT, GHOST_RIGHT, GHOST_CENTER,
         TYPE_FOCUS, INVENTORY_FOCUS,
         SWITCH_TO_FRONT, SWITCH_TO_BACK,
         GHOST_ACTIONS,
         ITEMS_READY,
         SHOW_PROGRESS, SHOW_LOADOUTS, SHOW_TOWER       } from '../../actions'


export const rings = ( state = 'login', action ) => {

    switch ( action.type ) {

        case HIDE_RINGS:              return setRingState( state, 'none' );
        case DEFAULT_INTERFACE:       return setRingState( state, 'none' );
        case SWITCH_TO_FRONT:         return setRingState( state, 'none' );
        case SWITCH_TO_BACK:          return setRingState( state, 'none' );
        case ITEMS_READY:             return setRingState( state, 'none' );

        case LOGIN_RINGS:             return setRingState( state, 'login' );

        case OVERLAYS_RINGS:           return setRingState( state, 'overlays' );

        case INVENTORY_FOCUS:         return setRingState( state, 'inventory' );

        case TYPE_FOCUS:              return setRingState( state, 'subtype' );
        case SUBTYPE_RINGS:           return setRingState( state, 'subtype' );
        case SUBTYPE_OPT_RINGS:       return setRingState( state, 'subtype_overlays' );

        case SUBTYPE_FOCUS_RINGS:     return setRingState( state, 'subtype_focus' );
        case SUBTYPE_FOCUS_OPT_RINGS: return setRingState( state, 'subtype_focus_overlays' );

        case ITEM_ACTIONS_RINGS:      return setRingState( state, 'item_actions' );
        case ITEM_ACTIONS_OPT_RINGS:  return setRingState( state, 'item_actions_overlays' );

        default:

            return state;

    }

};


export const ghost = ( state = 'login', action ) => {

  switch ( action.type ) {

      case GHOST_LEFT:        return setRingState( state, 'left' );
      case GHOST_RIGHT:       return setRingState( state, 'right' );

      case SHOW_PROGRESS:     return setRingState( state, 'top' );
      case SHOW_LOADOUTS:     return setRingState( state, 'top' );
      case SHOW_TOWER:        return setRingState( state, 'top' );

      case GHOST_ACTIONS:     return setRingState( state, 'actions' );

      case GHOST_CENTER:      return setRingState( state, 'default' );

      case TYPE_FOCUS:        return setRingState( state, action.side );

      case INVENTORY_FOCUS:   return setRingState( state, 'bottom' );

      case DEFAULT_INTERFACE: return setRingState( state, 'default' );
      case ITEMS_READY:       return setRingState( state, 'default' );
      case SWITCH_TO_FRONT:   return setRingState( state, 'default' );
      case SWITCH_TO_BACK:    return setRingState( state, 'default' );

      default:

          return state;

  }

};


function setRingState ( state, type ) {

    let newState = Object.assign( {}, state );

    newState = type;

    return newState;

}