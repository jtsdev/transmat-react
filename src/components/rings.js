
import React                      from 'react'
import ReactCSSTransitionGroup    from 'react-addons-css-transition-group';

import { refreshItems,
         useDemoAccountSummary }  from '../helpers/get_data';

import { buildBeam,
         moveRaysTo,
         getRandomBeamAttributes } from './slot';

import { TweenMax,
         Power2,
         Sine,
         Back,
         Linear,
         TimelineLite,
         TimelineMax   }    from "gsap";


class Rings_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            rings: props.rings,
            onLoginClick: props.onLoginClick,
            onAboutClick: props.showAbout,
            login_buttons: [ 'login', 'about' ],
            overlay_buttons: [ 'settings', 'refresh', 'about', 'logout' ],
            interface_buttons: [ 'progress', 'loadouts' ],


        };

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        const appName  = document.querySelector( '.app_name_text' );

        if ( appName ) {

            showLoginSequence();

        }

    }

    componentDidUpdate() {

            if ( this.props.rings === 'overlays' && this.props.overlay === 'none' ) {

                if ( document.querySelector( '.from_bottom' ) ) {

                    returnToGhostMenu();

                } else {

                    showGhostMenuButtons();

                }

            } else if ( this.props.rings === 'inventory' ) {

                showInventoryRings();

            } else if ( this.props.rings === 'subtype' ) {

                this.props.ghost === 'left' ? showLeftRings() : showRightRings();

            } else if ( this.props.interface === 'subclass_focus' ) {


            } else if ( this.props.rings === 'none' && this.props.loginStatus === 'logged_in' ) {

                showDefaultRing();

            }



    }

    handleClick( e, type ) {

        e.stopPropagation();

        if ( this.props.overlay === type ) {

            this.props.hideOverlays();

        } else {

            switch ( type ) {

                // case 'login':       beginLoginTransition();                         break;
                case 'login':       useDemoAccountSummary();
                                    this.props.onLoginClick();                      break;


                case 'settings':    this.props.showSettings();                      break;

                case 'about':       this.props.showAbout();                         break;

                case 'refresh':     break; //refreshItems();
                                    //this.props.itemRefresh();                       break;

                case 'logout':      this.props.showLogout();                        break;

                case 'progress':    break; //showMenuCardRings( this.props.showProgress );   break;

                case 'loadouts':    break; //showMenuCardRings( this.props.showLoadouts );   break;

                case 'tower':       break; //showMenuCardRings( this.props.showTower );      break;

                default:
                    this.props.showAbout();

            }

        }

    }

    render() {

        let rings = ringRouter( this.props.rings, this.props.ghost, this.handleClick );
        let sub_components = this.props.rings !== 'none' && this.props.rings !== 'subtype' ? buttonBuilder( this.props.rings, this.props.focus, this.handleClick ) : null;

        return (

            <div className={ this.props.ghost === 'login' ? "rings_wrap login" : "rings_wrap" }>
                {
                    this.props.ghost === 'login' ?
                        <div className="app_title">
                            <div className="title_beam_target_wrap">
                                <div className="left_title_target"/>
                                <div className="right_title_target"/>
                            </div>
                            <div className="desc_beam_target_wrap">
                                <div className="left_desc_target"/>
                                <div className="right_desc_target"/>
                            </div>
                            <h1 className="app_name_text">TRANSMAT</h1>
                            <h4 className="app_desc_text">DESTINY COMPANION</h4>
                        </div> : null
                }
                {
                    this.props.interface === 'default' && this.props.itemsReady ?
                        <div className={ this.props.loginStatus === 'logged_in' ? "default_ring" : "default_ring hide" } /> : null
                }
                {
                    this.props.interface === 'default' && !this.props.itemsReady ?
                        <div className={ 'rings rotate' } /> : null
                }
                { rings }
                { sub_components }
                {
                    this.props.rings === 'overlays' ?
                        <MenuButtons onClick={ this.handleClick } /> : null
                }
            </div>

        )

    }

}


class MenuButtons extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        showMenuCardButtons();

    }

    handleClick( e, menuType ) {

        e.stopPropagation();

        this.props.onClick( e, menuType );

    }

    render() {

        return (

            <div className="menu_button_container">
                <button id="progress_button" className="menu_button" onClick={ ( e ) => this.handleClick( e, 'progress' ) }>Progress</button>
                <button id="loadouts_button" className="menu_button" onClick={ ( e ) => this.handleClick( e, 'loadouts' ) }>Loadouts</button>
                <button id="tower_button"    className="menu_button" onClick={ ( e ) => this.handleClick( e, 'tower'    ) }>Tower</button>
            </div>

        )

    }

}


// Helpers
    function ringRouter( rings, ghost, clickCall ) {

        switch( rings ) {

            case 'login':

                return  <div>
                            <div className={ 'rings' } key={ 'rings' } onClick={ ( e ) => clickCall( e, 'rings' ) } />
                            <div id="options_1" className="options_button_back login_about" />
                            <div id="options_5" className="options_button_back" />
                        </div>;

            case 'overlays':

                return  <div>
                            <div className={ 'rings '+ghost } key={ 'overlays_rings' } onClick={ ( e ) => clickCall( e, 'rings' ) } ></div>
                            <div id="options_1" className="options_button_back" />
                            <div id="options_2" className="options_button_back" />
                            <div id="options_3" className="options_button_back" />
                            <div id="options_4" className="options_button_back" />
                        </div>;

            case 'subtype':

                return  <div>
                            <div className={ 'rings '+ghost } key={ 'subtype_rings' } onClick={ ( e ) => clickCall( e, 'rings' ) } />
                        </div>;

            case 'inventory':

                return <div>
                            <div className={ 'rings '+ghost } key={ 'inventory_rings' } onClick={ ( e ) => clickCall( e, 'rings' ) } />
                       </div>;

        }


    }

    function buttonBuilder( rings, focus, clickCall ) {

        // get needed buttons based on type
        let btns   = buttonsFor( rings, focus );
        let length = btns.length;
        let anims  = cssFor( rings, length );
        let durs   = durationsFor( rings, length );

        let buttons = [];

        for ( let i = 0; i < length; i++ ) {

            const dur  = durs[ i ];
            const name = btns[ i ];
            const text = getTempHeader( name );

            buttons.push(
                            <ReactCSSTransitionGroup
                                transitionName={ anims[ i ] }
                                transitionAppear={ true } transitionAppearTimeout={ dur } transitionEnter={ false }
                                transitionLeave={ true }  transitionLeaveTimeout={ dur } key={ i }>
                                {
                                    rings === 'overlays' || rings == 'subtype' ?
                                        <button id={ name + "_button" } className={ rings === 'overlays' ? 'overlay_button' : 'subtype_button' } onClick={ ( e ) => clickCall( e, name ) } key={ name + "_button" }><p>{ text }</p></button> :
                                        <button className={ name + "_button" } onClick={ ( e ) => clickCall( e, name ) } key={ name + "_button" }><p>{ text }</p></button>
                                }
                            </ReactCSSTransitionGroup>
            )

        }

        return  <div className="rings_button_container">
                    { buttons }
                </div>;

    }

    function buttonsFor( type, focus ) {

        switch( type ) {

            case 'login':       return [ 'login', 'about' ];

            case 'overlays':    return [ 'settings', 'refresh', 'about', 'logout' ];

            case 'inventory':   return [ ]; //'materials', 'mods', 'consumables' ];

            case 'subtype':

                // Parse the focused item's ID of format: 'side#'
                // Returns array [ side, # ]
                const focusParams = sliceFocus( focus );

                const uiSide      = typeRouter[ focusParams[ 0 ] ];
                const typeObj     = uiSide[ focusParams[ 1 ] ];


                                return typeObj[ 'subtypes' ];

        }

    }
    function cssFor( type, length ) {

        switch ( type ) {

            case 'login':       return [ 'zoomIn', 'zoomIn' ];

            case 'overlays':     return [ 'overlaysSlideIn', 'overlaysSlideIn', 'overlaysSlideIn', 'overlaysSlideIn', 'special', 'special' ];

            case 'inventory':   return [ 'slideUp', 'slideUp', 'slideUp' ];

            case 'subtype':

                let array = [];

                for ( let i = 0; i < length; i++ ) { array.push( 'subtypes' ) }

                return array;

        }

    }
    function durationsFor( type, length ) {

        switch ( type ) {

            case 'login':       return [ 750, 750 ];

            case 'overlays':     return [ 1000, 1000, 1000, 1000, 200, 200 ];

            case 'inventory':   return [ 500, 500, 500 ];

            case 'subtype':

                let array = [];

                for ( let i = 0; i < length; i++ ) { array.push( 750 ) }

                return array;

        }

    }

    function sliceFocus( focus ) {

            let length = focus.length;

            let side   = focus.slice( 0, length-1 );
            let pos    = focus[ length-1 ].slice();

            return [ side, pos ];

    }

    let typeRouter = {

        'left': {

            1 : {
                type: 'kinetic',
                subtypes: [ 'Auto Rifle', 'Hand Cannon', 'Pulse Rifle', 'Scout Rifle', 'Sidearm', 'Submachine Gun' ]
            },
            2 : {
                type: 'energy',
                subtypes: [ 'Auto Rifle', 'Hand Cannon', 'Pulse Rifle', 'Scout Rifle', 'Sidearm', 'Submachine Gun' ]
            },
            3 : {
                type: 'power',
                subtypes: [ 'Fusion Rifle', 'Shotgun', 'Sniper Rifle', 'Grenade Launcher', 'Rocket Launchers'  ]
            },
            4 : {
                type: 'ghost',
                subtypes: [ 'Ghost' ]
            },
            6 : {
                type: 'ship',
                subtypes: [ 'Ship' ]
            },
            7 : {
                type: 'sparrow',
                subtypes: [ 'Sparrow' ]
            },
            8 : {
                type: 'horn',
                subtypes: [ 'Horn' ]
            }

        },

        'right': {

            1 : {
                type: 'head',
                subtypes: [ 'Hunter', 'Warlock', 'Titan', 'Misc' ]
            },
            2 : {
                type: 'arms',
                subtypes: [ 'Hunter', 'Warlock', 'Titan', 'Misc' ]
            },
            3 : {
                type: 'chest',
                subtypes: [ 'Hunter', 'Warlock', 'Titan', 'Misc' ]
            },
            4 : {
                type: 'legs',
                subtypes: [ 'Hunter', 'Warlock', 'Titan', 'Misc' ]
            },
            5 : {
                type: 'class_armor',
                subtypes: [ 'Hunter', 'Warlock', 'Titan' ]
            },
            6 : {
                type: 'clan',
                subtypes: [ 'Clan' ]
            },
            7 : {
                type: 'shader',
                subtypes: [ 'Shader' ]
            },
            8 : {
                type: 'emblem',
                subtypes: [ 'Emblem' ]
            },
            9 : {
                type: 'emote',
                subtypes: [ 'Emote' ]
            }

        }

    };

    function getTempHeader( name ) {

        switch ( name ) {

            case 'login':
                // return 'Login';
                return 'Enter';
            case 'about':
                return '';
            case 'settings':
                return '';
            case 'refresh':
                return '';
            case 'logout':
                return '';
            case 'progress':
                return '';
            case 'loadouts':
                return '';
            default:
                return 'T';

        }

    }

    function doRedirect() {

        window.location.replace( "https://www.bungie.net/en/Application/Authorize/9875" );

    }


// Animations

    function showDefaultRing() {

        const defaultRing = document.querySelector( '.default_ring' );

        TweenMax.fromTo( defaultRing, .35, { css: { scale: 2, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut } );

    }

    function showInventoryRings() {

        const rings = document.querySelector( '.rings' );

        if ( !document.querySelector( '.isInventory' ) ) {

            TweenMax.fromTo( rings, 2, { css: { scale: 1, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: .5 }, ease: Power2.easeInOut } );
            rings.classList.add( 'isInventory' );
        }

    }

    function showGhostMenuButtons() {

        const optionButton1 = document.querySelector( '#options_1' );
        const optionButton2 = document.querySelector( '#options_2' );
        const optionButton3 = document.querySelector( '#options_3' );
        const optionButton4 = document.querySelector( '#options_4' );

        const settings = document.querySelector( '#settings_button' );
        const refresh  = document.querySelector( '#refresh_button'  );
        const about    = document.querySelector( '#about_button'    );
        const logout   = document.querySelector( '#logout_button'   );

        const buttons  = document.querySelector( '.rings_button_container' );

        let timeline = new TimelineMax();

        timeline.set( buttons, { css: { autoAlpha: 1 } }, 0 );

        timeline.fromTo( optionButton1, 1, { css: { scale: .6, rotation: 0, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: 1 } , ease: Back.easeOut },  0 );
        timeline.fromTo( optionButton2, 1, { css: { scale: .6, rotation: 0, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: 1 } , ease: Back.easeOut }, .1 );
        timeline.fromTo( optionButton3, 1, { css: { scale: .6, rotation: 0, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: 1 } , ease: Back.easeOut }, .2 );
        timeline.fromTo( optionButton4, 1, { css: { scale: .6, rotation: 0, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: 1 } , ease: Back.easeOut }, .3 );

        timeline.fromTo( settings, .15, { autoAlpha: 0 }, { autoAlpha: 1 }, .25  );
        timeline.fromTo( refresh , .15, { autoAlpha: 0 }, { autoAlpha: 1 }, .35  );
        timeline.fromTo( about   , .15, { autoAlpha: 0 }, { autoAlpha: 1 }, .45  );
        timeline.fromTo( logout  , .15, { autoAlpha: 0 }, { autoAlpha: 1 }, .55  );

    }

    function showMenuCardButtons() {

        // lowerEmblem();
        waterfallMenuButtons();

    }

    function lowerEmblem() {

        let mainEmb      = document.querySelector( '#mainEmblem' );
        let ghostEye     = document.querySelector( '.ghost_eye' );

        let centerSquare = document.querySelector( '#options_1' );
        const ghostBounds = centerSquare.getBoundingClientRect();

        // TweenMax.set( btnContainer, { y: dY }, 0 );

        const dY = ghostBounds.top + 66;

        let timeline = new TimelineMax();

        // Lower Emblem
            timeline.to( mainEmb, .5, { css: { y: dY, transformOrigin: '50% 0' }, ease: Power2.easeOut }, 0 );

            timeline.call( waterfallMenuButtons, null, null, .5 );

    }

    function  waterfallMenuButtons() {

        let centerSquare = document.querySelector( '#options_1' );
        let btnContainer = document.querySelector( '.menu_button_container' );
        let menuButtons  = document.querySelectorAll( '.menu_button' );
        let rings        = document.querySelector( '.rings' );
        let ghostEye     = document.querySelector( '.ghost_eye' );

        let timeline = new TimelineMax();

            timeline.to( btnContainer, .1, { autoAlpha: 1 }, 0 );

        // Eye Scans
            timeline.to( ghostEye, .25, { css: { x: -2, y: -2 }, ease: Power2.easeOut }, 0 );
            timeline.to( ghostEye, .4, { css: { x: 2         }, ease: Power2.easeOut }, .25 );
            timeline.to( ghostEye, .35,  { css: { x: 0,  y: 0  }, ease: Power2.easeOut }, .65 );

        // Waterfall Menu Buttons
            for ( let i = 0; i < menuButtons.length; i++ ) {

                timeline.to( menuButtons[ i ], .5, { css: { y: 0, autoAlpha: 1 }, ease: Power2.easeInOut }, .5 + .07*i );

            }

        // Show Rings
            timeline.fromTo( rings, 1, { css: { scale: .3, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: .5 }, ease: Power2.easeOut }, 0 );


    }

    function showLeftRings() {

        const rings = document.querySelector( '.rings' );

        if ( !document.querySelector( '.rings_shifted' ) ) {

            TweenMax.fromTo( rings, 1.3, { css: { x: -100, y: 15, scale: .3, autoAlpha: 0 } }, { css: { scale: 1.3, autoAlpha: .3 }, ease: Power2.easeOut } );
            rings.classList.add( 'rings_shifted' );

        }


    }

    function showRightRings() {

        const rings = document.querySelector( '.rings' );

        if ( !document.querySelector( '.rings_shifted' ) ) {

            TweenMax.fromTo( rings, 1.3, { css: { x: 100, y: 15, scale: .3, autoAlpha: 0 } }, { css: { scale: 1.3, autoAlpha: .3 }, ease: Power2.easeOut } );
            rings.classList.add( 'rings_shifted' );

        }

    }

    function showMenuCardRings( cb ) {

        let timeline = new TimelineMax();

        if ( document.querySelector( '.ghost.top' ) ) {

            timeline.call( cb, null, null, 0 );

        } else {

            const ghost    = document.querySelector( '.ghost' );
            const rings    = document.querySelector( '.rings' );
            const buttons  = document.querySelector( '.rings_button_container' );
            const btnBacks = document.querySelectorAll( '.options_button_back' );

            if ( !document.querySelector( '.from_bottom' ) ) {

                document.querySelector( '.menu_button_container' ).classList.add( 'from_bottom' );

            }

            timeline.to( buttons,  .15, { autoAlpha: 0 }, 0 );
            timeline.to( btnBacks, .15, { autoAlpha: 0 }, 0 );

            timeline.to( ghost, .5, { css: { scale: .8, y: 250 }, ease: Power2.easeInOut }, .15 );
            timeline.to( rings, .5, { css: { scale: .8, y: 250 }, ease: Power2.easeInOut }, .15 );

            timeline.call( cb, null, null, .65 );

        }

    }

    function returnToGhostMenu() {

        const ghost = document.querySelector( '.ghost' );
        const rings = document.querySelector( '.rings' );

        let timeline = new TimelineMax();

        timeline.to( ghost, .5, { css: { scale: 1, y: 0 }, ease: Power2.easeInOut }, 0 );
        timeline.to( rings, .5, { css: { scale: 1, y: 0 }, ease: Power2.easeInOut }, 0 );

        timeline.call( showGhostMenuButtons, null, null, .5 );

    }

    function showLoginSequence() {

        const appTitle  = document.querySelector( '.app_title'     );
        const appName   = document.querySelector( '.app_name_text' );
        const appDesc   = document.querySelector( '.app_desc_text' );
        const ghost     = document.querySelector( '.ghost'         );
        const ghostEye  = document.querySelector( '.ghost_eye'     );
        const rings     = document.querySelector( '.rings'         );
        const aboutBtn  = document.querySelector( '.about_button'  );
        const loginBtn  = document.querySelector( '.login_button'  );
        const aboutBack = document.querySelector( '#options_1'     );
        const loginBack = document.querySelector( '#options_5'     );

        const leftTitleTarget = document.querySelector(".left_title_target");
        const rightTitleTarget = document.querySelector(".right_title_target");
        const rightDescTarget = document.querySelector(".right_desc_target");
        const leftDescTarget = document.querySelector(".left_desc_target");
        const titleBeamTarget = document.querySelector(".title_beam_target_wrap");
        const descBeamTarget = document.querySelector(".desc_beam_target_wrap");
        const focusBeam = document.querySelector("#beamTarget1");
        const rayFocus = document.querySelector(".beamTargetFull");
        const pathEl = document.querySelector( "#beamPathEl" );
        const beamStart = buildBeam( rayFocus, "up" );
        const beamPath = buildBeam( leftTitleTarget, "up" );
        const beamPath2 = buildBeam( appName, "up" );
        const beamPath3 = buildBeam( rightTitleTarget, "up" );
        const beamPath4 = buildBeam( rightDescTarget, "up" );
        const beamPath5 = buildBeam( appDesc, "up" );
        const beamPath6 = buildBeam( leftDescTarget, "up" );

        // Place Scanner Character Backs for coming launch sequence
        const scanCharBackLeft = document.querySelector(".scanner_char_back_left");
        const scanCharBackRight = document.querySelector(".scanner_char_back_right");
        const scanCharBackLeftUp = document.querySelector(".scanner_char_back_left_up");
        const scanCharBackRightUp = document.querySelector(".scanner_char_back_right_up");
        const windowWidth = window.innerWidth;

        const ray0 = document.querySelector("#beamRay0");
        const ray1 = document.querySelector("#beamRay1");
        const ray2 = document.querySelector("#beamRay2");
        const ray3 = document.querySelector("#beamRay3");
        const ray4 = document.querySelector("#beamRay4");
        const ray5 = document.querySelector("#beamRay5");
        const ray6 = document.querySelector("#beamRay6");
        const ray7 = document.querySelector("#beamRay7");

        let timeline = new TimelineMax();

        // transform: matrix(0.75, 0, 0, 0.75, 1440, 328);
        timeline.set( scanCharBackLeft, { css: { scale: .75, x: windowWidth * -1, y: 328 } }, 0 );
        timeline.set( scanCharBackRight, { css: { scale: .75, x: windowWidth, y: 328 } }, 0 );
        timeline.set( scanCharBackLeftUp, { css: { scale: .75, x: windowWidth * -1, y: -35 } }, 0 );
        timeline.set( scanCharBackRightUp, { css: { scale: .75, x: windowWidth, y: -35 } }, 0 );


        // Randomize Beam Attributes
        const beamAttrs = getRandomBeamAttributes(8);
        timeline.to( ray0, 0, { css: { stroke: beamAttrs.stroke[0], strokeWidth: beamAttrs.strokeWidth[0], strokeDasharray: beamAttrs.strokeDash[0], strokeDashoffset: beamAttrs.strokeDashOffset[0] } }, 0 );
        timeline.to( ray1, 0, { css: { stroke: beamAttrs.stroke[1], strokeWidth: beamAttrs.strokeWidth[1], strokeDasharray: beamAttrs.strokeDash[1], strokeDashoffset: beamAttrs.strokeDashOffset[1] } }, 0 );
        timeline.to( ray2, 0, { css: { stroke: beamAttrs.stroke[2], strokeWidth: beamAttrs.strokeWidth[2], strokeDasharray: beamAttrs.strokeDash[2], strokeDashoffset: beamAttrs.strokeDashOffset[2] } }, 0 );
        timeline.to( ray3, 0, { css: { stroke: beamAttrs.stroke[3], strokeWidth: beamAttrs.strokeWidth[3], strokeDasharray: beamAttrs.strokeDash[3], strokeDashoffset: beamAttrs.strokeDashOffset[3] } }, 0 );
        timeline.to( ray4, 0, { css: { stroke: beamAttrs.stroke[4], strokeWidth: beamAttrs.strokeWidth[4], strokeDasharray: beamAttrs.strokeDash[4], strokeDashoffset: beamAttrs.strokeDashOffset[4] } }, 0 );
        timeline.to( ray5, 0, { css: { stroke: beamAttrs.stroke[5], strokeWidth: beamAttrs.strokeWidth[5], strokeDasharray: beamAttrs.strokeDash[5], strokeDashoffset: beamAttrs.strokeDashOffset[5] } }, 0 );
        timeline.to( ray6, 0, { css: { stroke: beamAttrs.stroke[6], strokeWidth: beamAttrs.strokeWidth[6], strokeDasharray: beamAttrs.strokeDash[6], strokeDashoffset: beamAttrs.strokeDashOffset[6] } }, 0 );
        timeline.to( ray7, 0, { css: { stroke: beamAttrs.stroke[7], strokeWidth: beamAttrs.strokeWidth[7], strokeDasharray: beamAttrs.strokeDash[7], strokeDashoffset: beamAttrs.strokeDashOffset[7] } }, 0 );


        // timeline.to( focusBeam, 0, { css: { y: "-25px" } }, 0 );

        timeline.set( pathEl, { css: { opacity: 0 } }, 0 );
        timeline.set( pathEl, { css: { opacity: .6 } }, 1.75 );
        timeline.to( pathEl, 0, { attr: { d: beamStart } }, 0 )
        timeline.to( pathEl, .5, { attr: { d: beamPath }, ease: Power2.easeOut }, 1.75 );
        timeline.to( pathEl, .5, { attr: { d: beamPath2 }, ease: Power2.easeOut }, 2.25 );
        timeline.to( pathEl, .25, { attr: { d: beamPath3 }, ease: Power2.easeOut }, 2.75 );
        timeline.to( pathEl, .1, { attr: { d: beamPath4 }, ease: Power2.easeOut }, 3 );
        timeline.to( pathEl, .5, { attr: { d: beamPath5 }, ease: Power2.easeOut }, 3.1 );
        timeline.to( pathEl, .25, { attr: { d: beamPath6 }, ease: Power2.easeOut }, 3.6 );
        timeline.to( pathEl, .5, { attr: { d: beamStart }, css: { opacity: 0 }, ease: Power2.easeOut }, 3.85 );

        timeline.set( ".beamRay", { css: { opacity: 0 } }, 0 );
        timeline.set( ".beamRay", { css: { opacity: 1 } }, 1.75 );
        timeline.call( moveRaysTo, [ 1, rayFocus, "square", 0, Power2.easeNone ], null, 0 );
        timeline.call( moveRaysTo, [ 1, leftTitleTarget, "tall", .5, Power2.easeOut ], null, 1.75 );
        timeline.call( moveRaysTo, [ 1, titleBeamTarget, "wide", .5, Power2.easeOut ], null, 2.25 );
        timeline.call( moveRaysTo, [ 1, rightTitleTarget, "tall", .25, Power2.easeOut ], null, 2.75 );
        timeline.call( moveRaysTo, [ 1, rightDescTarget, "tall", .1, Power2.easeOut ], null, 3 );
        timeline.call( moveRaysTo, [ 1, descBeamTarget, "wide", .5, Power2.easeOut ], null, 3.1 );
        timeline.call( moveRaysTo, [ 1, leftDescTarget, "tall", .25, Power2.easeOut ], null, 3.6 );
        timeline.call( moveRaysTo, [ 1, rayFocus, "square", .5, Power2.easeOut ], null, 3.85 );

        timeline.to( ray0, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray1, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray2, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray3, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray4, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray5, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray6, 0, { css: { opacity: 0 } }, 4.35 );
        timeline.to( ray7, 0, { css: { opacity: 0 } }, 4.35 );

        // Initial Text Scales
            timeline.set( appName, { css: { scaleX: 0, transformOrigin: '0 50%' } }, 0 );
            timeline.set( appDesc, { css: { scaleX: 0, transformOrigin: '100% 50%' } }, 0 );

        // Position Beam Target
            // timeline.set( beamTarget, { css: { x: beamStart.x, y: beamStart.y, scale: .1, opacity: 0 } }, 0 );
            // timeline.set( line1, { attr:{ x1: '50%', y1: '47%', x2: '50%', y2: '50%' } }, 0 );

        // Zoom Ghost In
            timeline.fromTo( ghost, 1, { css: { scale: 0, y: -100 } }, { css: { scale: 3, y: 0 }, ease: Power2.easeOut }, .5 );

        // Eye Up / Left
            timeline.to( ghostEye, .1, { css: { x: -2, y: -2 }, ease: Linear.easeNone }, 1.5 );

        // Beam Text to Top
              // timeline.fromTo( appTitle, .75, { css: { scale: 0, transformOrigin: '50% 270%' } }, { css: { scale: 1 }, ease: Power2.easeOut }, 1.5 );
            // timeline.to( beamTarget, .75, { css: { x: beamStart.x1, y: beamStart.y1, scale: 1, opacity: .6, height: 79 } }, 1.5 );
              // timeline.to( beamTarget, 0, { css: { zIndex: -1 } }, 2 );
              // timeline.to(line1, 1, { attr: { x2: beamStart.x1, y2: beamStart.y1 }, ease:Power2.easeOut }, 1.5)

        // Expand Name Right / Scan Right
            timeline.to( appName, .5, { css: { scaleX: 1 }, ease: Power2.easeOut }, 2.25 );
            timeline.to( ghostEye, .5, { css: { x: 2 }, ease: Power2.easeOut }, 2.25 );
            // timeline.to( beamTarget, .5, { css: { width: '355px' }, ease: Power2.easeOut }, 2.25 );

        // Flatten Beam Target to Right
            // timeline.to( beamTarget, .25, { css: { scaleX: .05, transformOrigin: '100% 50%' } }, 2.4 );
            
        // Drop Beam Target to App Description
            // timeline.to( beamTarget, .1, { css: { y: beamStart.y2, height: '18px' } }, 2.65 );    

        // Expand Desc Left / Scan Left
            timeline.to( appDesc, .5, { css: { scaleX: 1 }, ease: Power2.easeOut }, 3.1 );
            timeline.to( ghostEye, .5, { css: { x: -2 }, ease: Power2.easeOut }, 3.1 );
            // timeline.to( beamTarget, .5, { css: { scaleX: 1 }, ease: Power2.easeOut }, 2.75 );

        // Flatten Beam Target to Left
            // timeline.to( beamTarget, .25, { css: { width: '0px', opacity: 0 } }, 2.9 );    

        // Drop Ghost Down
            timeline.to( ghost, 1, { css: { y: 75 }, ease: Back.easeIn }, 3.85 );

        // Center Eye
            timeline.to( ghostEye, .2, { css: { x: 0, y: 0 }, ease: Linear.easeNone }, 3.85 );

        // Expand Rings
            timeline.fromTo( rings, 1, { css: { scale: .6, autoAlpha: 0 } }, { css: { scale: 1.75, autoAlpha: .6 }, ease: Power2.easeOut }, 4.75 );
            // timeline.to( rings, 100, {rotation:"360", ease:Linear.easeNone, repeat:-1} );

        // Show Button Backs
            timeline.fromTo( loginBack, 1, { css: { scale: .6, autoAlpha: 0, rotation: 0 } }, { css: { scale: 1.25, autoAlpha: 1, rotation: 0 }, ease: Back.easeOut }, 5 );
            timeline.fromTo( aboutBack, 1, { css: { scale: .6, autoAlpha: 0 } },              { css: { scale: 1.5, autoAlpha: 1 }, ease: Back.easeOut }, 5 );

        // Show Buttons
            timeline.fromTo( loginBtn, .15, { autoAlpha: 0 }, { autoAlpha: 1 }, 5.25 );
            timeline.fromTo( aboutBtn, .15, { autoAlpha: 0 }, { autoAlpha: 1 }, 5.25 );

            // const randomX = random(5, 10);
            // const randomY = random(50, 100);
            // const randomDelay = random(0, 1);
            // const randomTime = random(3, 5);
            // const randomTime2 = random(5, 10);
            // const randomAngle = random(8, 12);

            // TweenMax.set(ghost, {
            //     x: randomX(-1),
            //     y: randomX(-1)
            //   });
              
            //   moveX(ghost, 1);
            //   moveY(ghost, 1);

            // function moveX(target, direction) {
  
            //     TweenMax.to(target, randomTime(), {
            //       x: randomX(direction),
            //       ease: Sine.easeInOut,
            //       onComplete: moveX,
            //       onCompleteParams: [target, direction * -1]
            //     });
            //   }
              
            //   function moveY(target, direction) {
                
            //     TweenMax.to(target, randomTime(), {
            //       y: randomY(direction),
            //       ease: Sine.easeInOut,
            //       onComplete: moveY,
            //       onCompleteParams: [target, direction * -1]
            //     });
            //   }
              
            //   function random(min, max) {
            //     const delta = max - min;
            //     return (direction = 1) => (min + delta * Math.random()) * direction;
            //   }
    }

    

    function beginLoginTransition() {

        const appTitle  = document.querySelector( '.app_title'    );
        const ghost     = document.querySelector( '.ghost'        );
        const ghostEye  = document.querySelector( '.ghost_eye'    );
        const rings     = document.querySelector( '.rings'        );
        const aboutBtn  = document.querySelector( '.about_button' );
        const loginBtn  = document.querySelector( '.login_button' );
        const aboutBack = document.querySelector( '#options_1'    );
        const loginBack = document.querySelector( '#options_5'    );

        let timeline = new TimelineMax();

        // Eye Up
            timeline.to( ghostEye, .1, { css: { y: -3 }, ease: Linear.easeNone }, 0 );

        // Shrink Title In
            timeline.to( appTitle, .25, { css: { scaleX: 0, transformOrigin: '50% 50%' }, ease: Power2.easeOut }, 0 );

        // Fade Buttons
            timeline.to( loginBtn, .15, { autoAlpha: 0 }, 0 );
            timeline.to( aboutBtn, .15, { autoAlpha: 0 }, 0 );

        // Hide Button Backs
            timeline.to( loginBack, .25, { css: { scale: .4, autoAlpha: 0, rotation: 0 }, ease: Back.easeIn }, 0 );
            timeline.to( aboutBack, .25, { css: { scale: .4, autoAlpha: 0 }, ease: Back.easeIn }, 0 );

        // Hide Rings
            timeline.to( rings, .25, { css: { scale: .6, autoAlpha: 0 }, ease: Power2.easeOut }, .1 );

        // Eye Center
            timeline.to( ghostEye, .1, { css: { y: 0 }, ease: Linear.easeNone }, .3 );

        // Drop Ghost Out
            timeline.to( ghost, .5, { css: { y: 400 }, ease: Back.easeIn }, .3 );

        timeline.call( doRedirect, null, null, .8 );

    }

    function initialBeamPosition( ghost, beamTarget, appTitle, appDesc ) {

        const ghostPosition = ghost.getBoundingClientRect();
        const beamTargetPosition = beamTarget.getBoundingClientRect();
        const titlePosition = appTitle.getBoundingClientRect();
        const descPosition = appDesc.getBoundingClientRect();

        const startCoords = {

            x: ghostPosition.x - beamTargetPosition.x,
            y: ghostPosition.y - beamTargetPosition.y - 100,
            x1: titlePosition.x - beamTargetPosition.x,
            y1: titlePosition.y - beamTargetPosition.y,
            x2: descPosition.x - beamTargetPosition.x,
            y2: descPosition.y - beamTargetPosition.y

        }

        return startCoords;

    }


export default Rings_Comp