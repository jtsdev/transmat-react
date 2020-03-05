
import { HIDE_INTERFACE,   DEFAULT_INTERFACE,
         EMBLEM_INTERFACE,
         INVENTORY_FOCUS,
         SWITCH_TO_BACK, SWITCH_TO_FRONT,
         SUBCLASS_FOCUS,
         STORED_FOCUS,

         TYPE_FOCUS,

         OVERLAYS_RINGS, HIDE_RINGS,

         SET_CHARACTERS,
         CHARACTER_0, CHARACTER_1, CHARACTER_2,

         ITEM_FOCUS,
         SET_SUBCLASS,
         ITEMS_READY, ITEM_REFRESH, UPDATE_TOGGLE, INTERFACE_LAUNCHED,
         LOGIN_ATTEMPT, LOGIN_SUCCESS } from '../../actions'


export const loginStatus = ( state = 'logged_out', action ) => {

    switch ( action.type ) {

        case LOGIN_ATTEMPT:        return setInterface( state, 'pending' );
        case LOGIN_SUCCESS:        return setInterface( state, 'logged_in' );

        case INTERFACE_LAUNCHED:   return setInterface( state, 'logged_in' );

        default:

            return state

    }

};

export const mainInterface = ( state = 'none', action ) => {

    switch ( action.type ) {

        case DEFAULT_INTERFACE:    return setInterface( state, 'default' );
        case ITEMS_READY:          return setInterface( state, 'default' );
        case HIDE_RINGS:           return setInterface( state, 'default' );

        case EMBLEM_INTERFACE:     return setInterface( state, 'emblem' );
        case OVERLAYS_RINGS:       return setInterface( state, 'emblem' );

        case SWITCH_TO_BACK:       return setInterface( state, 'default' );
        case SWITCH_TO_FRONT:      return setInterface( state, 'default' );

        case TYPE_FOCUS:           return setInterface( state, 'type_focus' );
        case INVENTORY_FOCUS:      return setInterface( state, 'inventory_focus' );
        case STORED_FOCUS:         return setInterface( state, 'stored_focus');
        case SUBCLASS_FOCUS:       return setInterface( state, 'subclass_focus' );

        case HIDE_INTERFACE:       return setInterface( state, 'none' );

        default:

            return state

    }

};


export const gearBar = ( state = 'none', action ) => {

  switch( action.type ) {

      case TYPE_FOCUS:          return setInterface( state, action.target );
      case INVENTORY_FOCUS:     return setInterface( state, action.target );
      case SUBCLASS_FOCUS:      return setInterface( state, action.target );

      case HIDE_INTERFACE:      return setInterface( state, 'none' );
      case DEFAULT_INTERFACE:   return setInterface( state, 'none' );

      case SWITCH_TO_BACK:      return setInterface( state, 'none' );
      case SWITCH_TO_FRONT:     return setInterface( state, 'none' );

      default:

          return state

  }

};


export const storedFocus = ( state = 'none', action ) => {

  switch( action.type ) {

      case STORED_FOCUS:        return setInterface( state, action.target );

      case DEFAULT_INTERFACE:    return setInterface( state, 'none' );
      case SWITCH_TO_BACK:       return setInterface( state, 'none' );
      case SWITCH_TO_FRONT:      return setInterface( state, 'none' );

      default:

          return state

  }

};


export const switcher = ( state = 'front', action ) => {

  switch ( action.type ) {

      case SWITCH_TO_FRONT:      return setInterface( state, 'front' );

      case SWITCH_TO_BACK:       return setInterface( state, 'back' );

      default:

          return state;

  }

};


export const itemsReady = ( state = false, action ) => {

    switch ( action.type ) {

        case ITEMS_READY:       return setInterface( state, true );

        case ITEM_REFRESH:      return setInterface( state, false );

        default:

            return state;

    }

};


export const updateToggle = ( state = false, action ) => {

  switch ( action.type ) {

      case UPDATE_TOGGLE:       return setInterface( state, action.payload );

      default:

          return state;

  }

};


export const character = ( state = 0, action ) => {

    switch ( action.type ) {

        case CHARACTER_0:       return setInterface( state, 0 );

        case CHARACTER_1:       return setInterface( state, 1 );

        case CHARACTER_2:       return setInterface( state, 2 );

        default:

            return state;

    }

};

export const charModels = ( state = [], action ) => {

    switch( action.type ) {

        case SET_CHARACTERS:    return setInterface( state, action.payload );

        default:

            return state;

    }

};

export const focusItem = ( state = {}, action ) => {

  switch( action.type ) {

      case ITEM_FOCUS:      return setInterface( state, action.item );

      default:

          return state;

  }

};

export const focusSubclass = ( state = {}, action ) => {

  switch ( action.type ) {

      case SET_SUBCLASS:    return setInterface( state, action.payload );

      default:

          return state;

  }

};



function setInterface( state, type ) {

    let newState = Object.assign( {}, state );

    newState = type;

    return newState;

}