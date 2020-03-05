

import React                   from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import InventoryButtons       from './inventory_buttons'
import InventoryFocus          from './inventory_focus'
import { inventoryBucketScan } from './inventory_focus'

import { TweenMax,
         Power2,
         TimelineMax  }    from "gsap";


class InventoryBar_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        if ( this.props.loginStatus === 'logged_in' ) {

            const inventoryBtns = document.querySelector( '.inventory_button_container' );

            TweenMax.fromTo( inventoryBtns, .5, { css: { scaleY: 0, transformOrigin: '50% 100%' } }, { css: { scaleY: 1, transformOrigin: '50% 100%' }, ease: Power2.easeOut } );

        }

    }

    handleClick( clickTarget, invType ) {

        let isFocus = this.props.typeFocus,
            intType = this.props.interfaceType;

        //  Open if Default
            if ( intType === 'default' && !document.querySelector( '.glow' ) ) {

                focusInventoryBar( clickTarget, invType, this.props.onInventoryClick );
            }

        // Trigger Default Interface if Focus clicked again
            else if ( invType === isFocus ) {

                unfocusInventoryBar( this.props.switcher, this.props.onInventoryFocusClick )
            }

        // Else switch buckets
            else {

                changeInventoryFocus( invType, this.props.onInventoryClick );

            }

    }

    componentDidUpdate() {

        if ( this.props.interfaceType === 'default' ) { document.querySelector( '.inventory_bar' ).classList.remove( 'open' ); }

    }

    render() {

        const typeFocus = this.props.typeFocus;
        const items     = this.props.items;

        return (

            <div className="inventory_bar">

                {
                    this.props.interfaceType === 'inventory_focus' || typeFocus === 'cons' || typeFocus === 'mods' || typeFocus === 'shad' ?

                    <InventoryFocus items={ sort( items, typeFocus ) } focusType={ typeFocus } /> : null

                }
                <InventoryButtons clickCall={ this.handleClick } />

            </div>

        )

    }

}


// Helpers

    function sort( items, type ) {

        let typeItems = [];
        let buckId    = getIdentifier( type );

        for ( let i = 0; i < items.length; i++ ) {

            if ( items[ i ].inventory.bucketTypeHash === buckId ) {

                typeItems.push( items[ i ] );

            }

        }

        return typeItems;

    }
    function getIdentifier( type ) {

        switch ( type ) {

            case 'cons':        return 1469714392;
            case 'mods':        return 3313201758;
            case 'shad':        return 2973005342;

            default:

                return 'none';

        }

    }


// Animations


    function focusInventoryBar( clickTarget, invType, cb ) {

        const gearBarLeft   = document.querySelector( '.gear_bar_left' );
        const gearBarRight  = document.querySelector( '.gear_bar_right' );
        const ghost         = document.querySelector( '.ghost' );
        const ghostEye      = document.querySelector( '.ghost_eye' );
        const defaultRing   = document.querySelector( '.default_ring' );
        const inventoryBar  = document.querySelector( '.inventory_bar' );
        const inventoryBtns = document.querySelectorAll( '.button_scale_inventory' );

        let timeline = new TimelineMax();

        // Check window height to determine inventory_focus' vertical shift
            const winHeight = window.innerHeight;
            const dY = winHeight < 620 ? -375 : -400;

            let dX;

            dX = invType === 'cons' ? -1 : 0;
            dX = invType === 'shad' ?  1 : dX;

            // console.log(invType, dX);

        // Eye Down / Eye Up
            timeline.to( ghostEye, .3, { css: { x: dX, y: 2 }, ease: Power2.easeOut }, 0 );
            timeline.to( ghostEye, .5, { css: { y: 0 }, ease: Power2.easeOut }, .35 );

        // Shrink Bars Up
            timeline.to( gearBarLeft,  .35, { css: { scaleY: 0, transformOrigin: '50% 10%' }, ease: Power2.easeOut }, 0 );
            timeline.to( gearBarRight, .35, { css: { scaleY: 0, transformOrigin: '50% 10%' }, ease: Power2.easeOut }, 0 );

        // Fade Default Ring
            timeline.to( defaultRing, .25, { css: { scale: 1.2, autoAlpha: 0 }, ease: Power2.easeOut }, 0 );

        // Raise Ghost
            timeline.to( ghost, .77, { css: { scale: 1, y: -140 }, ease: Power2.easeOut }, .58 );

        // Raise Inventory Bar
            timeline.to( inventoryBar, 1, { css: { y: dY }, ease: Power2.easeOut }, .35 );

        // Shrink Buttons
            for ( let i = 0; i < inventoryBtns.length; i++ ) {
                timeline.to( inventoryBtns[ i ], .5, { css: { scale: .9 }, ease: Power2.easeOut }, .35 );
            }

            for ( let i = 0; i < inventoryBtns.length; i++ ) {
                if ( inventoryBtns[ i ].children[ 0 ] === clickTarget ) {


        // Focus Button/Add Glow
            timeline.to( inventoryBtns[ i ], .5, { css: { scale: 1, autoAlpha: 1, transformOrigin: '50% 40%' }, ease: Power2.easeOut }, .85 );
            timeline.to( inventoryBtns[ i ].children[ 0 ], .5, { css: { backgroundColor: 'rgba(0, 191, 255, .85)', boxShadow: '0 0 25px #00bfff' }, ease: Power2.easeOut }, .85 );
            inventoryBtns[ i ].children[ 0 ].classList.add( 'glow' );


                } else {


        // Unfocus Button
            timeline.to( inventoryBtns[ i ], .5, { css: { scale: .8, autoAlpha: .6, transformOrigin: '50% 40%' }, ease: Power2.easeOut }, .85 );


                }
        }

        timeline.call( cb, [ invType ], null, 1.15 );

    }

    function changeInventoryFocus( invType, cb ) {

        const invBtns  = document.querySelectorAll( '.button_scale_inventory' );
        const oldFocus = document.querySelector( '.glow' );
        const bucket   = document.querySelector( '.inventory_focus' );
        const ghostEye = document.querySelector( '.ghost_eye' );

        let timeline = new TimelineMax();

        // Hide Inventory Bucket
            timeline.to( bucket, .25, { css: { scale: 0.7, autoAlpha: 0, transformOrigin: '50% -15%' }, ease: Power2.easeOut }, 0 );

        // Unfocus Old Inventory Button
            timeline.to( oldFocus.parentNode, .25, { css: { scale: .8, autoAlpha: .6 }, ease: Power2.easeOut }, 0 );
            timeline.to( oldFocus, .25, { css: { backgroundColor: 'rgba(255,255,255,.5)', boxShadow: '' }, ease: Power2.easeOut }, 0 );
            oldFocus.classList.remove( 'glow' );

        let buttonIndex;
        let dX;

        if (      invType === 'cons' ) { buttonIndex = 0; dX = -1 }
        else if ( invType === 'mods' ) { buttonIndex = 1; dX =  0 }
                                  else { buttonIndex = 2; dX =  1 }

        // Eye to New Focus
            timeline.to( ghostEye, .2, { css: { x: dX }, ease: Power2.easeOut }, .05 );

        // Focus New Inventory Button
            timeline.to( invBtns[ buttonIndex ], .5, { css: { scale: 1, autoAlpha: 1, transformOrigin: '50% 40%' }, ease: Power2.easeOut }, .25 );
            timeline.to( invBtns[ buttonIndex ].children[ 0 ], .5, { css: { backgroundColor: 'rgba(0, 191, 255, .85)', boxShadow: '0 0 25px #00bfff' }, ease: Power2.easeOut }, .25 );
            invBtns[ buttonIndex ].children[ 0 ].classList.add( 'glow' );

        // Trigger State Change
            timeline.call( cb, [ invType ], null, .75 );

        // Show New Inventory Bucket
        //     timeline.to( bucket,  )
        // console.log('InvType: ', invType );
        timeline.call( inventoryBucketScan, [ invType ], null, .85 );

    }

    export function unfocusInventoryBar( switcher, cb ) {

        document.querySelector( '.glow' ).classList.remove( 'glow' );

        const ghost   = document.querySelector( '.ghost' );
        // const ghostEye = document.querySelector( '.ghost_eye' );
        const rings   = document.querySelector( '.rings' );
        const invBar  = document.querySelector( '.inventory_bar' );
        const invBtns = document.querySelectorAll( '.button_scale_inventory' );
        const bucket  = document.querySelector( '.inventory_focus' );


        let timeline = new TimelineMax();

        timeline.to( ghost, .5,  { css: { y: 0 }, ease: Power2.easeOut }, 0 );
        timeline.to( rings, .5,  { css: { scale: .6, y: 0, autoAlpha: 0 }, ease: Power2.easeOut }, 0 );
        timeline.to( invBar, .5, { css: { y: 0 }, ease: Power2.easeOut }, 0 );
        timeline.to( bucket, .5, { css: { scaleY: 0, transformOrigin: '50% 0' }, ease: Power2.easeOut }, 0 );

        for ( let i = 0; i < invBtns.length; i++ ) {

            timeline.to( invBtns[ i ], .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );
            timeline.to( invBtns[ i ].children[ 0 ], .5, { css: { backgroundColor: 'rgba(255,255,255,.5)', boxShadow: '' }, ease: Power2.easeOut }, 0 )

        }

        if ( switcher ) {

            timeline.call( cb, [ switcher ], null, .5 );

        }

    }


// -------


export default InventoryBar_Comp