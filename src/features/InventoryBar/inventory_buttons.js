
import React                   from 'react'


// import { Power2,
//          TimelineMax  }    from "gsap";


class InventoryButtons extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e, invType ) {

        e.stopPropagation();

        const glow = document.querySelector( '.glow' );

        if ( glow ) {

            if ( glow === e.target ) {

                this.props.clickCall( e.target, invType );

            } else {

                this.props.clickCall( e.target, invType );
            }

        } else {

            this.props.clickCall( e.target, invType );

        }

    }

    render() {

        return (

            <div className="inventory_button_container">

                <div className="button_scale_inventory">
                    <button id="materials_button"   className="inventory_button" onClick={ ( e ) => this.handleClick( e, 'cons' ) }></button>
                </div>
                <div className="button_scale_inventory">
                    <button id="mods_button"        className="inventory_button" onClick={ ( e ) => this.handleClick( e, 'mods' ) }></button>
                </div>
                <div className="button_scale_inventory">
                    <button id="consumables_button" className="inventory_button" onClick={ ( e ) => this.handleClick( e, 'shad' ) }></button>
                </div>

            </div>

        )

    }

}


// Scale/Glow Buttons
// Shift Button Bar
// function focusInventoryBar( clickTarget, invType, cb ) {

//     const inventoryBar  = document.querySelector( '.inventory_bar' );
//     const inventoryBtns = document.querySelectorAll( '.button_scale_inventory' );

//     let timeline = new TimelineMax();


//         for ( let i = 0; i < inventoryBtns.length; i++ ) {

//             if ( inventoryBtns[ i ].children[ 0 ] === clickTarget ) {

//                 timeline.to( inventoryBtns[ i ], .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );
//                 inventoryBtns[ i ].children[ 0 ].classList.add( 'glow' );

//             } else {

//                 timeline.to( inventoryBtns[ i ], .5, { css: { scale: .8, autoAlpha: .6 }, ease: Power2.easeOut }, 0 );

//             }

//         }

//         timeline.to( inventoryBar, .5, { css: { y: -400 }, ease: Power2.easeOut }, 0 );

//         timeline.call( cb, [ invType ], null, .5 );

// }


// Hide Current Bucket
// Unfocus Old Button
// Focus New Button
// function changeInventoryFocus() {

// }


// Hide Inventory Bucket
// Scale/Unglow Buttons
// Shift Button Bar
// function unfocusInventoryBar( invType, cb ) {

//     document.querySelector( '.glow' ).classList.remove( 'glow' );

//     const invBar = document.querySelector( '.inventory_bar' );


//     let timeline = new TimelineMax();

//     timeline.to( invBar, .5, { css: { y: 0 }, ease: Power2.easeInOut } );

//     timeline.call( cb, [ invType ], null, .5 );

// }


export default InventoryButtons;
