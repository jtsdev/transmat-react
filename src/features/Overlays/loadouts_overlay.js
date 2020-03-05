
import React     from 'react'
import MenuCard  from './menu_card'


class LoadoutsOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        setTimeout( function() {

            document.querySelector( '.loadouts_overlay_bar' ).style.transform = 'scale(1)';
            document.querySelector( '.loadouts_overlay_bar' ).style.opacity   = 1;

        }, 250 );

    }

    handleClick( e, route ) {

    }

    render() {

        return (

            <div className="loadouts_overlay_bar">

                <div className="loadouts_overlay">

                    <MenuCard title={ 'Equip' } />
                    <MenuCard title={ 'Create' } />

                </div>

            </div>

        )

    }

}



export default LoadoutsOverlay