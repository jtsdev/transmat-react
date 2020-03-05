
import React                   from 'react'
import Rings                   from '../containers/Rings'

import { Power2,
         Back,
         TimelineMax   }    from "gsap";


class Ghost_Comp extends React.Component {

    constructor( props ) {

        super( props );
        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

        if ( this.props.interfaceType !== 'none' && this.props.overlays === 'none' && !document.querySelector( '.emblem.lower' ) ) {

            if ( document.querySelector( '.rings' ) ) {

                ghostMenuToInterface( this.props.onGhostClick, this.props.rings, this.props.interfaceType );

            } else {

                document.querySelector( '.rings_wrap' ).classList.remove( 'transition_out' );
                interfaceToGhostMenu( this.props.onGhostClick, this.props.rings, this.props.interfaceType );

            }

        } else {

            document.querySelector( '.rings_wrap' ).classList.toggle( 'transition_out' );

            // 3 after fixing triggerRotate
            const pick = Math.floor(Math.random() * 2);
            const ghostEmoteOptions = [ shellWave, shellPulse, triggerRotate ];

            let emote = ghostEmoteOptions[ pick ];
            emote();
        }

    }

    render() {

        return (

            <div className="ghost_transition">
                <Rings />

                <div className={ "ghost " + this.props.ghost } key={ 'ghost' } onClick={ ( e ) => this.handleClick( e ) }>
                    <div className="ghost_eye"    />
                    <div className="shell_top"    />
                    <div className="shell_bottom" />
                    <div className="shell_left"   />
                    <div className="shell_right"  />
                </div>
            </div>

        )

    }

}


// Animations

    // Ghost Shell
        function triggerRotate() {

            if ( document.querySelector( '.ghost' ).classList.contains( 'rotateRight' ) ) {

                document.querySelector( '.ghost' ).classList.remove( 'rotateRight' );
                document.querySelector( '.ghost' ).classList.toggle( 'rotateLeft' );

            } else {

                document.querySelector( '.ghost' ).classList.remove( 'rotateLeft' );
                document.querySelector('.ghost').classList.toggle('rotateRight');

            }

        }

        function shellPulse() {

            // const ghostEye    = document.querySelector( '.ghost_eye'    );
            const shellTop    = document.querySelector( '.shell_top'    );
            const shellBottom = document.querySelector( '.shell_bottom' );
            const shellLeft   = document.querySelector( '.shell_left'   );
            const shellRight  = document.querySelector( '.shell_right'  );

            let timeline = new TimelineMax();

            timeline.to( shellTop   , .5, { css: { y: -10 }, ease: Back.easeIn }, 0 );
            timeline.to( shellBottom, .5, { css: { y: 10  }, ease: Back.easeIn }, 0 );
            timeline.to( shellLeft  , .5, { css: { x: -10 }, ease: Back.easeIn }, 0 );
            timeline.to( shellRight , .5, { css: { x: 10  }, ease: Back.easeIn }, 0 );

            timeline.to( shellTop   , .5, { css: { y: 0 }, ease: Back.easeIn }, .5 );
            timeline.to( shellBottom, .5, { css: { y: 0 }, ease: Back.easeIn }, .5 );
            timeline.to( shellLeft  , .5, { css: { x: 0 }, ease: Back.easeIn }, .5 );
            timeline.to( shellRight , .5, { css: { x: 0 }, ease: Back.easeIn }, .5 );

        }

        function shellWave() {

            // const ghostEye    = document.querySelector( '.ghost_eye'    );
            const shellTop    = document.querySelector( '.shell_top'    );
            const shellBottom = document.querySelector( '.shell_bottom' );
            const shellLeft   = document.querySelector( '.shell_left'   );
            const shellRight  = document.querySelector( '.shell_right'  );

            let timeline = new TimelineMax();

            timeline.to( shellTop   , .35, { css: { y: -6 }, ease: Power2.easeOut }, 0 );
            timeline.to( shellBottom, .35, { css: { y: 6  }, ease: Power2.easeOut }, 0.2 );
            timeline.to( shellLeft  , .35, { css: { x: -6 }, ease: Power2.easeOut }, 0.3 );
            timeline.to( shellRight , .35, { css: { x: 6  }, ease: Power2.easeOut }, 0.1 );

            timeline.to( shellTop   , .35, { css: { y: 0 }, ease: Power2.easeOut }, .35 );
            timeline.to( shellBottom, .35, { css: { y: 0 }, ease: Power2.easeOut }, .55 );
            timeline.to( shellLeft  , .35, { css: { x: 0 }, ease: Power2.easeOut }, .65 );
            timeline.to( shellRight , .35, { css: { x: 0 }, ease: Power2.easeOut }, .45 );

        }

    // Menu Transitions
        function interfaceToGhostMenu( cb, rings, intType ) {

            const gearBarLeft   = document.querySelector( '.gear_bar_left' );
            const gearBarRight  = document.querySelector( '.gear_bar_right' );
            const inventoryBtns = document.querySelector( '.inventory_button_container' );
            const defaultRing   = document.querySelector( '.default_ring' );

            let timeline = new TimelineMax();

            // Shrink Bars Out
                timeline.to( gearBarLeft,  .25, { css: { scaleX: 0, transformOrigin: '0% 50%'   }, ease: Power2.easeOut }, 0 );
                timeline.to( gearBarRight, .25, { css: { scaleX: 0, transformOrigin: '100% 50%' }, ease: Power2.easeOut }, 0 );

            // Shrink Inventory Buttons Down
                timeline.to( inventoryBtns, .25, { css: { scaleY: 0, transformOrigin: '50% 100%' }, ease: Power2.easeOut }, 0 );

            // Expand Ring Out
                timeline.to( defaultRing, .35, { css: { scale: 2, autoAlpha: 0 }, ease: Power2.easeOut }, 0 );

            // Trigger State Change
                timeline.call( cb, [ rings, intType ], null, .35 );

        }

        function ghostMenuToInterface( cb, rings, intType ) {


            let ringsEl     = document.querySelector( '.rings' );
            let buttons     = document.querySelector( '.rings_button_container' );
            let buttonBacks = document.querySelectorAll( '.options_button_back' );
            let menuButtons = document.querySelectorAll( '.menu_button' );

            // let option1 = document.querySelector( '#option1' );

            let timeline = new TimelineMax();

            // Hide Option Buttons
                timeline.to( buttons,     .25, { autoAlpha: 0 }, 0 );
                timeline.to( buttonBacks, .25, { autoAlpha: 0 }, 0 );
                timeline.to( buttonBacks, .6 , { css: { scale: 0 }, ease: Back.easeInOut }, 0 );

            // Hide Rings
                timeline.to( ringsEl, .5, { css: { scale: .3, autoAlpha: 0 }, ease: Power2.easeOut }, 0 );

            // Hide Menu Buttons
                for ( let i = 0; i < menuButtons.length; i++ ) {

                    timeline.to( menuButtons[ i ], .35, { css: { y: -52, autoAlpha: 0 }, ease: Power2.easeOut }, .07*i );

                }


            timeline.call( cb, [ rings, intType ], null, .55 );

        }


export default Ghost_Comp