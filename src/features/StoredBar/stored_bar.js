

import React           from 'react'
import Stored_Buttons  from './stored_buttons'
import StoredFocus     from './stored_focus'

import { focusItems,
         getBuckId   } from '../../components/loadout'


class StoredBar_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( subtype ) {

        this.props.onStoredClick( subtype );

    }

    componentDidUpdate() {

        if ( this.props.interfaceType === 'type_focus' ) { document.querySelector( '.stored_bar' ).classList.add( 'show_buttons' ); }
        else if ( this.props.interfaceType === 'default' ) { document.querySelector( '.stored_bar' ).classList.remove( 'show_buttons' ); }

    }

    render() {

        const focus     = this.props.typeFocus,
              items     = this.props.items,
              intType   = this.props.interfaceType;

        const buckId    = getBuckId( focus );
        const typeItems = focusItems( buckId, items );

        let barClass    = 'stored_bar lifted',
            showStored  = true;

        if ( intType === 'subclass_focus' || intType === 'inventory_focus' ) { showStored = false }
        if ( focus === 'none' || focus === 'mats' || focus === 'mods' || focus === 'cons' ) { showStored = false }


        if ( focus.includes( 'left1' ) || focus.includes( 'left2' ) || focus.includes( 'left3' ) ) {

            barClass = 'stored_bar';

        }

        return (

            <div className={ barClass }>

                { showStored ? <Stored_Buttons focus={ this.props.typeFocus } subFocus={ this.props.storedFocus } clickCall={ this.handleClick } /> : null }
                { this.props.interfaceType === 'stored_focus' ? <StoredFocus items={ typeItems } subtype={ focus } focusType={ this.props.typeFocus } storedFocus={ this.props.storedFocus } /> : null }

            </div>

        )

    }

}


export default StoredBar_Comp