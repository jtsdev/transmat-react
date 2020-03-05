import React                   from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import Emblem,
       { hideEmblems,
         switchToLeftEmblem,
         switchToRightEmblem } from '../components/emblem'
import Character_Comp          from '../components/character'

import { buildBeam,
         moveRaysTo,
         getRandomBeamAttributes } from './slot';

import { TweenMax,
         Power2,
         TimelineMax  }    from "gsap";

import { charactersArray,
         allItemsArray       } from '../helpers/get_data'


class Interface_Comp extends React.Component {

    constructor( props ) {

        super( props );
        this.state = {
            characters: this.props.characters,
            items:      this.props.items
        };

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        waitForReady( this.props.onInterfaceLaunched );

        this.props.onInventoryMount( this.props.characters );

    }

    componentDidUpdate() {

        if ( this.state.items !== allItemsArray ) {

            this.setState({
                characters: charactersArray,
                items:      allItemsArray
            });

        }

    }

    handleClick( e, target ) {

        e.stopPropagation();

        document.querySelector( '#mainEmblem' ).classList.remove( 'lower' );

        const chars = this.state.characters;

        const focus = this.props.charFocus;
        let charFocus, alts = [];

        for ( let i = 0; i < chars.length; i++ ) {

            if ( chars[ i ].characterIndex === focus ) {

                charFocus = chars[ i ]

            } else {

                alts.push( chars[ i ] )

            }

        }

        switch ( target ) {

            case 'focus':   hideEmblems();  break;
            // case 'alt0':    switchToLeftEmblem( alts[ 0 ].characterIndex, this.props.onChangeCharacter );   break;
            // case 'alt1':    switchToRightEmblem( alts[ 1 ].characterIndex, this.props.onChangeCharacter );  break;
            case 'alt0':    switchToLeftEmblem( 1, this.props.onChangeCharacter );   break;
            case 'alt1':    switchToRightEmblem( 2, this.props.onChangeCharacter );  break;

        }

    }

    render() {

        const type    = this.props.interfaceType,
              typeFoc = this.props.typeFocus,
              focus   = this.props.charFocus,
              chars   = this.state.characters,
              items   = this.state.items;

        let charFocus,
            subclassFocus,
            backURL0,
            backURL1,
            backURL2,
            alts        = [],
            focusItems  = [],
            storedItems = [],
            mailItems   = [];

        // Sort Focus and Alternate Characters
            for ( let i = 0; i < chars.length; i++ ) {

                if ( chars[ i ].characterIndex === focus ) {
                    charFocus = chars[ i ]
                } else {
                    alts.push( chars[ i ] )
                }

            }

        // Sort Items: Focus, Stored, Mail
            for ( let i = 0; i < items.length; i++ ) {

                if ( items[ i ].bucketHash === 215593132 ) {

                    mailItems.push( items[ i ] );

                } else if ( items[ i ].characterIndex === focus ) {

                    if ( items[ i ].inventory.bucketTypeHash === 3284755031 && items[ i ].isEquipped ) {

                        subclassFocus = items[ i ];

                    }

                    focusItems.push( items[ i ] );

                } else {

                    storedItems.push( items[ i ] );

                }

            }

        // Set Character Background Class Emblems
            // backURL0 = getClassEmblemIcon( charFocus.classType );

            // if ( alts ) {
            //     backURL1 = getClassEmblemIcon( alts[ 0 ].classType );
            //     if ( alts[ 1 ] ) {
            //         backURL2 = getClassEmblemIcon( alts[ 1 ].classType );
            //     }
            // }


        return (

            <div className="interface">

                {/* <div className={ "char_back "       + backURL0 } onClick={ ( e ) => this.handleClick( e, 'focus' ) } />
                <div className={ "char_back left "  + backURL1 } onClick={ ( e ) => this.handleClick( e, 'alt0'  ) } />
                <div className={ "char_back right " + backURL2 } onClick={ ( e ) => this.handleClick( e, 'alt1'  ) } /> */}
                <div className={ "char_back "       } onClick={ ( e ) => this.handleClick( e, 'focus' ) } />
                <div className={ "char_back left "  } onClick={ ( e ) => this.handleClick( e, 'alt0'  ) } />
                <div className={ "char_back right " } onClick={ ( e ) => this.handleClick( e, 'alt1'  ) } />


                {
                    type === 'default' || type === 'emblem' || type === 'type_focus' || type === 'inventory_focus' || type === 'stored_focus' || type === 'subclass_focus' || type === 'item_details' || type === 'item_actions' ?

                    <div className="emblem_bar">
                        <Emblem id="mainEmblem" showStats={ type === 'default' } charFocus={ charFocus } alts={ alts } onChangeCharacter={ this.props.onChangeCharacter } interface={ type } />
                    </div> : null
                }

                <Character_Comp type={ type } typeFoc={ typeFoc } charFocus={ charFocus } onMount={ this.props.onCharacterMount } subclassFocus={ subclassFocus } focusItems={ focusItems } storedItems={ storedItems } charItems={ [] } invItems={ [] } />

            </div>

        )

    }

}


function waitForReady( launchCB ) {

    let right6 = document.querySelector( '.right6' );

    if ( right6 ) {

        setTimeout( function() {
            launchInterface( launchCB );
            // quickLaunch( launchCB );
        }, 500 );

    } else {

        // console.log( 'not ready' );

        setTimeout( function() {
            waitForReady( launchCB );
        }, 1000 );

    }

}

// Animations

    function quickLaunch( launchCB ) {

        const interfaceComp = document.querySelector( '.interface' );
        const charBackM     = document.querySelector( '.char_back' );
        const charBackL     = document.querySelector( '.char_back.left' );
        const charBackR     = document.querySelector( '.char_back.right' );
        const emblemLeft    = document.querySelector( '#emblemLeft' );
        const emblemRight   = document.querySelector( '#emblemRight' );


        TweenMax.set( charBackM, { autoAlpha: 0 } );
        TweenMax.set( charBackL, { autoAlpha: 0 } );
        TweenMax.set( charBackR, { autoAlpha: 0 } );

        let timeline = new TimelineMax();

        timeline.to( interfaceComp , 1, { css: { scale: 1, y: 0, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );
        timeline.to( emblemLeft , .5, { autoAlpha: 0 }, 0 );
        timeline.to( emblemRight, .5, { autoAlpha: 0 }, 0 );

        timeline.call( readyAltEmblems, null, null, 0 );
        timeline.call( launchCB, null, null, 0 );



    }

    function launchInterface( launchCB ) {

        const interfaceComp = document.querySelector( '.interface' );
        const charBackM = document.querySelector( '.char_back' );
        const charBackL = document.querySelector( '.char_back.left' );
        const charBackR = document.querySelector( '.char_back.right' );

        const emblemLeft  = document.querySelector( '#emblemLeft' );
        const emblemRight = document.querySelector( '#emblemRight' );

        const mainBar = document.querySelector( '.main_bar' );
        const invBtns = document.querySelector( '.inventory_button_container' );

        // Beam Stuff
        const rayFocus = document.querySelector(".beamTargetFull");
        const rayFocusLeft = document.querySelector(".beamTargetFullLeft");

        const ray0 = document.querySelector("#beamRay0");
        const ray1 = document.querySelector("#beamRay1");
        const ray2 = document.querySelector("#beamRay2");
        const ray3 = document.querySelector("#beamRay3");
        const ray4 = document.querySelector("#beamRay4");
        const ray5 = document.querySelector("#beamRay5");
        const ray6 = document.querySelector("#beamRay6");
        const ray7 = document.querySelector("#beamRay7");
        const ray8 = document.querySelector("#beamRay8");
        const ray9 = document.querySelector("#beamRay9");
        const ray10 = document.querySelector("#beamRay10");
        const ray11 = document.querySelector("#beamRay11");
        const ray12 = document.querySelector("#beamRay12");
        const ray13 = document.querySelector("#beamRay13");
        const ray14 = document.querySelector("#beamRay14");
        const ray15 = document.querySelector("#beamRay15");
        const ray16 = document.querySelector("#beamRay16");
        const ray17 = document.querySelector("#beamRay17");
        const ray18 = document.querySelector("#beamRay18");
        const ray19 = document.querySelector("#beamRay19");
        const ray20 = document.querySelector("#beamRay20");
        const ray21 = document.querySelector("#beamRay21");
        const ray22 = document.querySelector("#beamRay22");
        const ray23 = document.querySelector("#beamRay23");

        const scanInterface = document.querySelector(".scanner_interface");

        const scanEmblem = document.querySelector(".scanner_emblem");
        const scanEmblemLeft = document.querySelector(".scanner_emblem_left");
        const scanEmblemRight = document.querySelector(".scanner_emblem_right");

        const scanEmblemCont = document.querySelector(".scanner_emblem_container");
        const scanEmblemContLeft = document.querySelector(".scanner_emblem_container_left");
        const scanEmblemContRight = document.querySelector(".scanner_emblem_container_right");

        const scanCharBackM = document.querySelector("#scanner_char_back_m");
        const scanCharBackLeft = document.querySelector(".scanner_char_back_left");
        const scanCharBackRight = document.querySelector(".scanner_char_back_right");
        const scanCharBackLeftUp = document.querySelector(".scanner_char_back_left_up");
        const scanCharBackRightUp = document.querySelector(".scanner_char_back_right_up");

        const scanBarLaunchLeft = document.querySelector(".scanner_bar_launch_left");
        const scanBarLaunchRight = document.querySelector(".scanner_bar_launch_right");

        const windowTarget = document.querySelector(".scanner");

        TweenMax.set( mainBar, { autoAlpha: 0 } );
        TweenMax.set( invBtns, { css: { scaleY: 0, transformOrigin: '50% 100%' } } );

        let width = window.innerWidth;

        if ( emblemLeft ) {

            TweenMax.set( emblemLeft, { css: { scale: 1, x: width * -1, y: '-25px' } } );
            TweenMax.set( charBackL, { css: { scale: .75, x: width * -1, y: '-35px' } } );

        }
        if ( emblemRight ) {

            TweenMax.set( emblemRight, { css: { scale: 1, x: width, y: '-25px' } } );
            TweenMax.set( charBackR, { css: { scale: .75, x: width, y: '-35px' } } );

        }

        let timeline = new TimelineMax();

        const pathEl = document.querySelector( "#beamPathEl" );
        const beamStart = buildBeam( rayFocus );
        const beamPath = buildBeam( scanEmblem, "front" );
        const beamPath2 = buildBeam( scanEmblemCont, "front" );
        const beamPath3 = buildBeam( scanInterface, "front" );
        const beamPath4 = buildBeam( scanCharBackM, "front" );
        const beamPath5 = buildBeam( windowTarget, "front" );

        timeline.to( pathEl,  0, { attr: { d: beamStart }, css:{ opacity: .8 }, }, 0 );
        timeline.to( pathEl, .5, { attr: { d: beamPath }, ease: Power2.easeOut }, 0 );
        timeline.to( pathEl, .5, { attr: { d: beamPath2 }, ease: Power2.easeOut }, .75 );
        timeline.to( pathEl, 1, { attr: { d: beamPath3 }, ease: Power2.easeOut }, 1.25 );
        timeline.to( pathEl, .5, { attr: { d: beamPath4 }, ease: Power2.easeOut }, 2.25 );
        timeline.to( pathEl, 1, { attr: { d: beamPath5 }, ease: Power2.easeOut }, 2.75 );
        timeline.to( pathEl, 1, { css: { opacity: 0 } }, 2.75 );
        timeline.to( pathEl,  0, { attr: { d: "" } }, 3.75 );

        const pathElLeft = document.querySelector( "#beamPathElLeft" );
        const beamStartLeft = buildBeam( rayFocusLeft );
        const beamPathLeft = buildBeam( scanEmblemLeft );
        const beamPathLeft2 = buildBeam( scanEmblemContLeft );
        const beamPathLeft3 = buildBeam( scanCharBackLeft );
        const beamPathLeft4 = buildBeam( scanCharBackLeftUp );
        const beamPathLeft5 = buildBeam( scanBarLaunchLeft );

        timeline.to( pathElLeft,  0, { attr: { d: beamStartLeft }, css:{ opacity: .8 }, }, 0 );
        timeline.to( pathElLeft, .5, { attr: { d: beamPathLeft }, ease: Power2.easeOut }, 0 );
        timeline.to( pathElLeft, .5, { attr: { d: beamPathLeft2 }, ease: Power2.easeOut }, .75 );
        timeline.to( pathElLeft, 1, { attr: { d: beamPathLeft3 }, ease: Power2.easeOut }, 1.25 );
        timeline.to( pathElLeft, .5, { attr: { d: beamPathLeft4 }, ease: Power2.easeOut }, 2.25 );
        timeline.to( pathElLeft, 1, { attr: { d: beamPathLeft5 }, ease: Power2.easeOut }, 2.75 );
        timeline.to( pathElLeft, 1, { css: { opacity: 0 } }, 2.75 );
        timeline.to( pathElLeft,  0, { attr: { d: "" } }, 3.75 );

        const pathElRight = document.querySelector( "#beamPathElRight" );
        const beamStartRight = buildBeam( rayFocus );
        const beamPathRight = buildBeam( scanEmblemRight );
        const beamPathRight2 = buildBeam( scanEmblemContRight );
        const beamPathRight3 = buildBeam( scanCharBackRight );
        const beamPathRight4 = buildBeam( scanCharBackRightUp );
        const beamPathRight5 = buildBeam( scanBarLaunchRight );

        timeline.to( pathElRight,  0, { attr: { d: beamStartRight }, css:{ opacity: .8 }, }, 0 );
        timeline.to( pathElRight, .5, { attr: { d: beamPathRight }, ease: Power2.easeOut }, 0 );
        timeline.to( pathElRight, .5, { attr: { d: beamPathRight2 }, ease: Power2.easeOut }, .75 );
        timeline.to( pathElRight, 1, { attr: { d: beamPathRight3 }, ease: Power2.easeOut }, 1.25 );
        timeline.to( pathElRight, .5, { attr: { d: beamPathRight4 }, ease: Power2.easeOut }, 2.25 );
        timeline.to( pathElRight, 1, { attr: { d: beamPathRight5 }, ease: Power2.easeOut }, 2.75 );
        timeline.to( pathElRight, 1, { css: { opacity: 0 } }, 2.75 );
        timeline.to( pathElRight,  0, { attr: { d: "" } }, 3.75 );

        // Randomize Beam Attributes
        const beamAttrs = getRandomBeamAttributes(8);
        timeline.to( ray0, 0, { css: { stroke: beamAttrs.stroke[0], strokeWidth: beamAttrs.strokeWidth[0], strokeDasharray: beamAttrs.strokeDash[0], strokeDashoffset: beamAttrs.strokeDashOffset[0], opacity: 1 } }, 0 );
        timeline.to( ray1, 0, { css: { stroke: beamAttrs.stroke[1], strokeWidth: beamAttrs.strokeWidth[1], strokeDasharray: beamAttrs.strokeDash[1], strokeDashoffset: beamAttrs.strokeDashOffset[1], opacity: 1 } }, 0 );
        timeline.to( ray2, 0, { css: { stroke: beamAttrs.stroke[2], strokeWidth: beamAttrs.strokeWidth[2], strokeDasharray: beamAttrs.strokeDash[2], strokeDashoffset: beamAttrs.strokeDashOffset[2], opacity: 1 } }, 0 );
        timeline.to( ray3, 0, { css: { stroke: beamAttrs.stroke[3], strokeWidth: beamAttrs.strokeWidth[3], strokeDasharray: beamAttrs.strokeDash[3], strokeDashoffset: beamAttrs.strokeDashOffset[3], opacity: 1 } }, 0 );
        timeline.to( ray4, 0, { css: { stroke: beamAttrs.stroke[4], strokeWidth: beamAttrs.strokeWidth[4], strokeDasharray: beamAttrs.strokeDash[4], strokeDashoffset: beamAttrs.strokeDashOffset[4], opacity: 1 } }, 0 );
        timeline.to( ray5, 0, { css: { stroke: beamAttrs.stroke[5], strokeWidth: beamAttrs.strokeWidth[5], strokeDasharray: beamAttrs.strokeDash[5], strokeDashoffset: beamAttrs.strokeDashOffset[5], opacity: 1 } }, 0 );
        timeline.to( ray6, 0, { css: { stroke: beamAttrs.stroke[6], strokeWidth: beamAttrs.strokeWidth[6], strokeDasharray: beamAttrs.strokeDash[6], strokeDashoffset: beamAttrs.strokeDashOffset[6], opacity: 1 } }, 0 );
        timeline.to( ray7, 0, { css: { stroke: beamAttrs.stroke[7], strokeWidth: beamAttrs.strokeWidth[7], strokeDasharray: beamAttrs.strokeDash[7], strokeDashoffset: beamAttrs.strokeDashOffset[7], opacity: 1 } }, 0 );

        const beamAttrs1 = getRandomBeamAttributes(8);
        timeline.to( ray8, 0, { css: { stroke: beamAttrs1.stroke[0], strokeWidth: beamAttrs1.strokeWidth[0], strokeDasharray: beamAttrs1.strokeDash[0], strokeDashoffset: beamAttrs1.strokeDashOffset[0], opacity: 1 } }, 0 );
        timeline.to( ray9, 0, { css: { stroke: beamAttrs1.stroke[1], strokeWidth: beamAttrs1.strokeWidth[1], strokeDasharray: beamAttrs1.strokeDash[1], strokeDashoffset: beamAttrs1.strokeDashOffset[1], opacity: 1 } }, 0 );
        timeline.to( ray10, 0, { css: { stroke: beamAttrs1.stroke[2], strokeWidth: beamAttrs1.strokeWidth[2], strokeDasharray: beamAttrs1.strokeDash[2], strokeDashoffset: beamAttrs1.strokeDashOffset[2], opacity: 1 } }, 0 );
        timeline.to( ray11, 0, { css: { stroke: beamAttrs1.stroke[3], strokeWidth: beamAttrs1.strokeWidth[3], strokeDasharray: beamAttrs1.strokeDash[3], strokeDashoffset: beamAttrs1.strokeDashOffset[3], opacity: 1 } }, 0 );
        timeline.to( ray12, 0, { css: { stroke: beamAttrs1.stroke[4], strokeWidth: beamAttrs1.strokeWidth[4], strokeDasharray: beamAttrs1.strokeDash[4], strokeDashoffset: beamAttrs1.strokeDashOffset[4], opacity: 1 } }, 0 );
        timeline.to( ray13, 0, { css: { stroke: beamAttrs1.stroke[5], strokeWidth: beamAttrs1.strokeWidth[5], strokeDasharray: beamAttrs1.strokeDash[5], strokeDashoffset: beamAttrs1.strokeDashOffset[5], opacity: 1 } }, 0 );
        timeline.to( ray14, 0, { css: { stroke: beamAttrs1.stroke[6], strokeWidth: beamAttrs1.strokeWidth[6], strokeDasharray: beamAttrs1.strokeDash[6], strokeDashoffset: beamAttrs1.strokeDashOffset[6], opacity: 1 } }, 0 );
        timeline.to( ray15, 0, { css: { stroke: beamAttrs1.stroke[7], strokeWidth: beamAttrs1.strokeWidth[7], strokeDasharray: beamAttrs1.strokeDash[7], strokeDashoffset: beamAttrs1.strokeDashOffset[7], opacity: 1 } }, 0 );
        
        const beamAttrs2 = getRandomBeamAttributes(8);
        timeline.to( ray16, 0, { css: { stroke: beamAttrs2.stroke[0], strokeWidth: beamAttrs2.strokeWidth[0], strokeDasharray: beamAttrs2.strokeDash[0], strokeDashoffset: beamAttrs2.strokeDashOffset[0], opacity: 1 } }, 0 );
        timeline.to( ray17, 0, { css: { stroke: beamAttrs2.stroke[1], strokeWidth: beamAttrs2.strokeWidth[1], strokeDasharray: beamAttrs2.strokeDash[1], strokeDashoffset: beamAttrs2.strokeDashOffset[1], opacity: 1 } }, 0 );
        timeline.to( ray18, 0, { css: { stroke: beamAttrs2.stroke[2], strokeWidth: beamAttrs2.strokeWidth[2], strokeDasharray: beamAttrs2.strokeDash[2], strokeDashoffset: beamAttrs2.strokeDashOffset[2], opacity: 1 } }, 0 );
        timeline.to( ray19, 0, { css: { stroke: beamAttrs2.stroke[3], strokeWidth: beamAttrs2.strokeWidth[3], strokeDasharray: beamAttrs2.strokeDash[3], strokeDashoffset: beamAttrs2.strokeDashOffset[3], opacity: 1 } }, 0 );
        timeline.to( ray20, 0, { css: { stroke: beamAttrs2.stroke[4], strokeWidth: beamAttrs2.strokeWidth[4], strokeDasharray: beamAttrs2.strokeDash[4], strokeDashoffset: beamAttrs2.strokeDashOffset[4], opacity: 1 } }, 0 );
        timeline.to( ray21, 0, { css: { stroke: beamAttrs2.stroke[5], strokeWidth: beamAttrs2.strokeWidth[5], strokeDasharray: beamAttrs2.strokeDash[5], strokeDashoffset: beamAttrs2.strokeDashOffset[5], opacity: 1 } }, 0 );
        timeline.to( ray22, 0, { css: { stroke: beamAttrs2.stroke[6], strokeWidth: beamAttrs2.strokeWidth[6], strokeDasharray: beamAttrs2.strokeDash[6], strokeDashoffset: beamAttrs2.strokeDashOffset[6], opacity: 1 } }, 0 );
        timeline.to( ray23, 0, { css: { stroke: beamAttrs2.stroke[7], strokeWidth: beamAttrs2.strokeWidth[7], strokeDasharray: beamAttrs2.strokeDash[7], strokeDashoffset: beamAttrs2.strokeDashOffset[7], opacity: 1 } }, 0 );


        timeline.call( moveRaysTo, [ 1, rayFocus, "square", 0, Power2.easeNone ], null, 0 );
        timeline.call( moveRaysTo, [ 2, rayFocus, "square", 0, Power2.easeNone ], null, 0 );
        timeline.call( moveRaysTo, [ 3, rayFocus, "square", 0, Power2.easeNone ], null, 0 );

        timeline.call( moveRaysTo, [ 1, scanEmblem, "wide", .5, Power2.easeOut ], null, 0 );
        timeline.call( moveRaysTo, [ 2, scanEmblemLeft, "wide", .5, Power2.easeOut ], null, 0 );
        timeline.call( moveRaysTo, [ 3, scanEmblemRight, "wide", .5, Power2.easeOut ], null, 0 );

        timeline.call( moveRaysTo, [ 1, scanEmblemCont, "wide", .5, Power2.easeOut ], null, .75 );
        timeline.call( moveRaysTo, [ 2, scanEmblemContLeft, "wide", .5, Power2.easeOut ], null, .75 );
        timeline.call( moveRaysTo, [ 3, scanEmblemContRight, "wide", .5, Power2.easeOut ], null, .75 );

        timeline.call( moveRaysTo, [ 1, scanInterface, "square", 1, Power2.easeOut ], null, 1.25 );
        timeline.call( moveRaysTo, [ 2, scanCharBackLeft, "square", 1, Power2.easeOut ], null, 1.25 );
        timeline.call( moveRaysTo, [ 3, scanCharBackRight, "square", 1, Power2.easeOut ], null, 1.25 );

        timeline.call( moveRaysTo, [ 1, scanCharBackM, "square", .5, Power2.easeOut ], null, 2.25 );
        timeline.call( moveRaysTo, [ 2, scanCharBackLeftUp, "square", .5, Power2.easeOut ], null, 2.25 );
        timeline.call( moveRaysTo, [ 3, scanCharBackRightUp, "square", .5, Power2.easeOut ], null, 2.25 );
        
        timeline.call( moveRaysTo, [ 1, windowTarget, "square", 1, Power2.easeOut ], null, 2.75 );
        timeline.call( moveRaysTo, [ 2, scanBarLaunchLeft, "square", 1, Power2.easeOut ], null, 2.75 );
        timeline.call( moveRaysTo, [ 3, scanBarLaunchRight, "square", 1, Power2.easeOut ], null, 2.75 );

        timeline.call( moveRaysTo, [ 1, rayFocus, "square", 0, Power2.easeNone ], null, 3.75 );
        timeline.call( moveRaysTo, [ 2, rayFocus, "square", 0, Power2.easeNone ], null, 3.75 );
        timeline.call( moveRaysTo, [ 3, rayFocus, "square", 0, Power2.easeNone ], null, 3.75 );

        timeline.to( ".beamRay", .5, { css: { opacity: 0 } }, 3.1 );

        // Launch Emblems
            timeline.to( interfaceComp , .5, { css: { scale: .3, y: '110px', autoAlpha: 1 }, ease: Power2.easeOut }, 0 );


        // Load Char Plates
            timeline.fromTo( charBackM, .5, { css: { scaleY: .12, scaleX: 0 }, ease: Power2.easeOut }, { css: { scaleX: 1 }, ease: Power2.easeOut }, .75 );
            timeline.to( charBackM, 1, { css: { scaleY: 1 }, ease: Power2.easeOut }, 1.25 );


        // Raise Chars
            timeline.to( interfaceComp , .5, { css: { y: '0px' }, ease: Power2.easeOut }, 2.25 );


        // Launch Chars
            timeline.to( interfaceComp , 1, { css: { scale: 1 }, ease: Power2.easeOut }, 2.75 );
            timeline.to( '.char_back', 1, { css: { autoAlpha: 0 }, ease: Power2.easeOut }, 2.75 );

            timeline.to( mainBar, 1, { autoAlpha: 1, ease: Power2.easeOut }, 2.75 );

            timeline.to( invBtns, .5, { css: { scaleY: 1 }, ease: Power2.easeOut }, 4 );


        // Char Back Left
            if ( emblemLeft ) {

                timeline.fromTo( charBackL, .5, { css: { scaleY: .1, scaleX: 0 }, ease: Power2.easeOut }, { css: { scaleX: .75 }, ease: Power2.easeOut }, .75 );
                timeline.to( charBackL, 1, { css: { scaleY: .75 }, ease: Power2.easeOut }, 1.25 );
                timeline.to( emblemLeft, .5, { css: { autoAlpha: 0 } }, 3 );

            // // // // Hide Char Back
            } else { TweenMax.set( charBackL, { autoAlpha: 0 } ); }


        // Char Back Right
            if ( emblemRight ) {

                timeline.fromTo( charBackR, .5, { css: { scaleY: .1, scaleX: 0 }, ease: Power2.easeOut }, { css: { scaleX: .75 }, ease: Power2.easeOut }, .75 );
                timeline.to( charBackR, 1, { css: { scaleY: .75 }, ease: Power2.easeOut }, 1.25 );
                timeline.to( emblemRight, .5, { autoAlpha: 0 }, 3 );

            // // // // Hide Char Back
            } else { TweenMax.set( charBackR, { autoAlpha: 0 } ); }


        // Ready Emblems for Character Switching
            timeline.call( readyAltEmblems, null, null, 3.75 );
            timeline.call( launchCB, null, null, 3.75 );

    }

    function readyAltEmblems() {

        const emblemLeft  = document.querySelector( '#emblemLeft' );
        const emblemRight = document.querySelector( '#emblemRight' );

        if ( emblemLeft ) {

            TweenMax.set( emblemLeft, { css: { scale: .6, x: '-200px', y: '0px' } } );

        }

        if ( emblemRight ) {

            TweenMax.set( emblemRight, { css: { scale: .6, x: '200px', y: '0px' } } );

        }

    }


// Helpers

    function getClassEmblemIcon( index ) {

        switch ( index ) {

            case 0:
                // Titan
                return 'titan';

            case 1:
                // Hunter
                return 'hunter';

            case 2:
                // Warlock
                return 'warlock';

        }

    }


export default Interface_Comp