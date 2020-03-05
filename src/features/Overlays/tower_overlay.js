

import React     from 'react'
import MenuCard  from './menu_card'
import Slot      from '../../containers/Slot'


class TowerOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        setTimeout( function() {

            document.querySelector( '.tower_overlay_bar' ).style.transform = 'scale(1)';
            document.querySelector( '.tower_overlay_bar' ).style.opacity   = 1;

        }, 250 );

    }

    handleClick( e, route ) {

    }

    render() {

        const postmasterItems = this.props.postmasterItem,
              engramItems     = this.props.engramItems,
              vaultItems      = this.props.vaultItems;

        return (

            <div className="tower_overlay_bar">

                <div className="tower_overlay">

                    <MenuCard title={ 'Engrams' }    engramItems={ engramItems } />
                    <MenuCard title={ 'Postmaster' } postmasterItems={ postmasterItems } />
                    <MenuCard title={ 'Vault' }      vaultItems={ vaultItems } />

                </div>

            </div>

        )

    }

}



export default TowerOverlay