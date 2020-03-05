

import React                      from 'react'
import { transferRouter }         from '../helpers/transfer'
// import { showTypeFocusAnimation } from '../features/Overlays/item_overlay'
import { Power2,
         TimelineMax   }          from "gsap";


export default class Emblem extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e, target ) {

        e.stopPropagation();

        if ( target === 'focus' || target === 'alt0' || target === 'alt1' ) {

            // Alts Visible
                if ( document.querySelector( '.lower' ) ) {

                    document.querySelector( '#mainEmblem' ).classList.remove( 'lower' );

                    switch ( target ) {

                        case 'focus':   hideEmblems();  break;

                        // case 'alt0':    switchToLeftEmblem( this.props.alts[ 0 ].characterIndex, this.props.onChangeCharacter );  break;

                        // case 'alt1':    switchToRightEmblem( this.props.alts[ 1 ].characterIndex, this.props.onChangeCharacter ); break;

                        case 'alt0':    switchToLeftEmblem( 1, this.props.onChangeCharacter );  break;

                        case 'alt1':    switchToRightEmblem( 2, this.props.onChangeCharacter ); break;
                        
                        default: console.log("Unknown Case");
                    }

            // Alts Hidden
                } else {

                    document.querySelector( '#mainEmblem' ).classList.add( 'lower' );
                    showEmblems();

                }

        } else if ( target === 'transfer' ) {

            this.props.clickClick();

            transferRouter( this.props.itemFocus, this.props.charFocus, this.props.chars, this.props.focusSibs, this.props.updateToggle, this.props.updateCB );

        }

    }

    render() {

        const name      = this.props.className;
        const smallText = name === 'emblem action' ? false : true;

        let embType     = this.props.embType ? this.props.embType : 'focus';

        // const charFocus = {}, //this.props.charFocus,
        const alts      = [{},{}]; //this.props.alts;

        // charFocus.charLvl = 40;

        const backPath  = 'url(https://www.bungie.net/common/destiny2_content/icons/21ece12fcc50be9e51599416e964155d.jpg)',//charFocus ? 'url(https://bungie.net' + charFocus.emblemBackgroundPath + ')' : 'none',
              charLvl   = 40, //charFocus.baseCharacterLevel,
              power     = 750, //charFocus.light,
            //   stats     = charFocus.stats,
              classType = getClassText( 1 ), //charFocus.classType ),
              race      = getRaceText( 0 ), //charFocus.raceType ),
              gender    = 'Male'; //charFocus.genderType === 0 ? 'Male' : 'Female';

        const subtext   = race + ' ' + gender;

        const alt0      = alts;
        let   alt1      = false;
        if ( alt0 ) {
            alt1 = alts.length > 1;
        }


        const altEmb0   = null; //alts ? 'url(https://bungie.net' + alts[ 0 ].emblemPath + ')' : null;
        const altBack0  = 'url(https://www.bungie.net/common/destiny2_content/icons/fc8a4349dc04777c474ec140c7b66d9e.jpg)';//alts ? 'url(https://bungie.net' + alts[ 0 ].emblemBackgroundPath + ')' : null;
        let altEmb1;
        let altBack1;
            if ( alts ) {

                altEmb1  = null; //alts[ 1 ] ? 'url(https://bungie.net' + alts[ 1 ].emblemPath + ')' : null;
                altBack1 = 'url(https://www.bungie.net/common/destiny2_content/icons/cc46632e2fe7f7ec633b849b70389b12.jpg)';//alts ? 'url(https://bungie.net' + alts[ 1 ].emblemBackgroundPath + ')' : null;

            }

        return (

            <div className="emblem_container">
                <div id={ this.props.id } style={{ backgroundImage: backPath }} className={ name ? name : 'emblem' } onClick={ ( e ) => this.handleClick( e, embType ) } >
                    <div className="emblem_img"></div>
                    <div className="emblem_info">
                        <div className="left_info">
                            <p  className="emblem_class">{ classType }</p>
                            {
                                smallText ?
                                <p className="emblem_clan">{ subtext }</p> : null
                            }
                        </div>
                        <div className="right_info">
                            {
                                smallText ?
                                    <div>
                                        <p className="emblem_light_level">{ power }</p>
                                        <p className="emblem_base_level">{ charLvl }</p>
                                    </div> : null
                            }
                        </div>
                    </div>
                    {
                        // this.props.showStats ?
                        // <div className="stat_bar">
                        //     <div className="stat_bar_div stat_icon_1"></div>
                        //     <div className="stat_bar_div"><p>{ stats[ 392767087 ] }</p></div>
                        //     <div className="stat_bar_div stat_icon_2"></div>
                        //     <div className="stat_bar_div"><p>{ stats[ 1943323491 ] > 0 ? stats[ 1943323491 ] : 0 }</p></div>
                        //     <div className="stat_bar_div stat_icon_3"></div>
                        //     <div className="stat_bar_div"><p>{ stats[ 2996146975 ] }</p></div>
                        // </div> : null
                        this.props.showStats ?
                        <div className="stat_bar">
                            <div className="stat_bar_div stat_icon_1"></div>
                            <div className="stat_bar_div"><p>5</p></div>
                            <div className="stat_bar_div stat_icon_2"></div>
                            <div className="stat_bar_div"><p>2</p></div>
                            <div className="stat_bar_div stat_icon_3"></div>
                            <div className="stat_bar_div"><p>7</p></div>
                        </div> : null
                    }
                </div>
                <div className="alt_container">
                    {
                        alts ?
                            <div className="alt_emblem" onClick={ ( e ) => this.handleClick( e, 'alt0' ) }>
                                <div className="alt_class"><p>{ getClassText( alts[ 0 ].classType ) }</p></div>
                                <div className="alt_emblem_img" style={{ backgroundImage: altEmb0 }}></div>
                            </div> : null
                    }
                    {
                        alt1 ?
                            <div className="alt_emblem" onClick={ ( e ) => this.handleClick( e, 'alt1' ) }>
                                <div className="alt_class"><p>{ getClassText( alts[ 1 ].classType ) }</p></div>
                                <div className="alt_emblem_img" style={{ backgroundImage: altEmb1 }}></div>
                            </div> : null
                    }
                </div>
                <div className="test_alts">
                    {
                        alts ?
                            <div style={{ backgroundImage: altBack0 }}
                                 id="emblemLeft" className={ 'emblem alt' } onClick={ (e) => this.handleClick(e, 'alt0') }>
                                <div className="emblem_img"></div>
                                <div className="emblem_info">
                                    <div className="left_info">
                                        <p className="emblem_class">{ getClassText( alts[ 0 ].classType ) }</p>
                                    </div>
                                    <div className="right_info">
                                        {
                                            smallText ?
                                                <div>
                                                    <p className="emblem_light_level">{ alts[ 0 ].light }</p>
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            </div> : null
                    }
                    {
                        alt1 ?
                            <div style={{backgroundImage: altBack1 }}
                                 id="emblemRight" className={ 'emblem alt' } onClick={ (e) => this.handleClick(e, 'alt1') }>
                                <div className="emblem_img"></div>
                                <div className="emblem_info">
                                    <div className="left_info">
                                        <p className="emblem_class">{ getClassText( alts[ 1 ].classType ) }</p>
                                    </div>
                                    <div className="right_info">
                                        {
                                            smallText ?
                                                <div>
                                                    <p className="emblem_light_level">{ alts[ 1 ].light }</p>
                                                </div> : null
                                        }
                                    </div>
                                </div>
                            </div> : null
                    }
                </div>
            </div>

        )

    }

}


function getClassText( type ) {

    switch ( type ) {

        case 0:     return 'Titan';

        case 1:     return 'Hunter';

        case 2:     return 'Warlock';

        default:

            return 'Class';

    }

}

function getRaceText( type ) {

    switch ( type ) {

        case 0:     return 'Human';

        case 1:     return 'Awoken';

        case 2:     return 'Exo';

        default:

            return 'Class';

    }

}


// Animations

    function showEmblems() {

        const mainEmb   = document.querySelector( '#mainEmblem' );
        const leftEmb   = document.querySelector( '#emblemLeft' );
        const rightEmb  = document.querySelector( '#emblemRight' );
        const charBackM = document.querySelector( '.char_back' );
        const charBackL = document.querySelector( '.char_back.left' );
        const charBackR = document.querySelector( '.char_back.right' );
        const mainBar   = document.querySelector( '.main_bar' );
        const overlays  = document.querySelector( '.overlays');
        const menuBtns  = document.querySelector( '.menu_button_container' );
        const ghost     = document.querySelector( '.ghost' );
        const defRing   = document.querySelector( '.default_ring' );
        const rings     = document.querySelector( '.rings' );


        const width = window.innerWidth;
        const dX    = width * .33;

        const height = window.innerHeight;
        const dY     = height * .28;

        const backDY = height * .31;
        const barDY  = height * .255 < 170 ? height * .255 : 170;

        const altDY     = height * .23;
        const altBackDY = height * .255;


        let timeline = new TimelineMax();

        defRing ? timeline.to( defRing, .5, { css: { scale: 2, autoAlpha: 0 }, ease: Power2.easeOut }, 0 ) : null;
        rings   ? timeline.to( rings, .5, { css: { y: -200, scale: .7 }, ease: Power2.easeOut }, 0 ) : null;
        timeline.to( ghost, .5, { css: { y: -200, scale: .7 }, ease: Power2.easeOut }, 0 );

        timeline.to( mainEmb , .5,  { css: { scale: .45,      y: dY }, ease: Power2.easeOut }, 0 );
        timeline.to( charBackM, .5, { css: { scale: .4, x: 0, y: backDY, autoAlpha: .5, transformOrigin: '50% 0%' }, ease: Power2.easeOut }, 0 );

        leftEmb  ? timeline.fromTo( leftEmb , .5, { css: { x: -315, y: 0 } }, { css: { scale: .45, y: altDY, x: dX * -1, autoAlpha: 1 }, ease: Power2.easeOut }, .25 ) : null;
        rightEmb ? timeline.fromTo( rightEmb, .5, { css: { x: 315,  y: 0 } }, { css: { scale: .45, y: altDY, x: dX,      autoAlpha: 1 }, ease: Power2.easeOut }, .25 )  : null;

        leftEmb ? timeline.fromTo( charBackL, .5,  { css: { scale: .31, x: -315, y: 0, rotationY: 0, autoAlpha: 0 } }, { css: { x: dX * -1, y: altBackDY, rotationY: 0, autoAlpha: .5 }, ease: Power2.easeOut }, .25 ) : null;
        rightEmb ? timeline.fromTo( charBackR, .5, { css: { scale: .31, x: 315,  y: 0, rotationY: 0, autoAlpha: 0 } }, { css: { x: dX,      y: altBackDY, rotationY: 0, autoAlpha: .5 }, ease: Power2.easeOut }, .25 ) : null;

        if ( mainBar ) {

            timeline.to( mainBar, .5, { css: { scale: .45, y: barDY, transformOrigin: '50% 0%' }, ease: Power2.easeOut }, 0 );

        }

        if ( menuBtns ) {

            timeline.to( overlays, .5, { css: { scale: .45, y: '205px', transformOrigin: '50% 0%' }, ease: Power2.easeOut }, 0 );
            timeline.to( menuBtns, .5, { css: { scale: .45, y: '165px', transformOrigin: '50% 0%' }, ease: Power2.easeOut }, 0 );

        }

    }

    export function hideEmblems() {

        const mainEmb   = document.querySelector( '#mainEmblem' );
        const leftEmb   = document.querySelector( '#emblemLeft' );
        const rightEmb  = document.querySelector( '#emblemRight' );
        const charBackM = document.querySelector( '.char_back' );
        const charBackL = document.querySelector( '.char_back.left' );
        const charBackR = document.querySelector( '.char_back.right' );
        const mainBar   = document.querySelector( '.main_bar' );
        const overlays  = document.querySelector('.overlays');
        const menuBtns  = document.querySelector( '.menu_button_container' );
        const ghost     = document.querySelector( '.ghost' );
        const ghostEye  = document.querySelector( '.ghost_eye' );
        const defRing   = document.querySelector( '.default_ring' );
        const rings     = document.querySelector( '.rings' );

        let timeline = new TimelineMax();

        // Slide Alt Emblems to Sides
            leftEmb  ? timeline.to( leftEmb , .5, { css: { y: -200, autoAlpha: 0 }, ease: Power2.easeOut }, .1 ) : null;
            rightEmb ? timeline.to( rightEmb, .5, { css: { y: -200, autoAlpha: 0 }, ease: Power2.easeOut }, .1 ) : null;

        // Slide Alt Char Backs to Sides
            leftEmb  ? timeline.to( charBackL, .5, { css: { y: -200, autoAlpha: 0 }, ease: Power2.easeOut }, .1 ) : null;
            rightEmb ? timeline.to( charBackR, .5, { css: { y: -200, autoAlpha: 0 }, ease: Power2.easeOut }, .1 ) : null;

        // Focus Main Emblem/Char Back, Fade Char Back Out
            timeline.to( mainEmb , .5,  { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, .1 );
            timeline.to( charBackM, .5, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, .1 );
            timeline.to( charBackM, 1,  { css: { autoAlpha: 0   }, ease: Power2.easeOut }, .1 );

        // Eye Down, Scan Up
            timeline.to( ghostEye, .1, { css: { y: 2 }, ease: Power2.easeOut },  0 );
            timeline.to( ghostEye, .5, { css: { y: 0 }, ease: Power2.easeOut }, .1 );

        // Return Ghost/Rings to Center
            timeline.to( ghost, 1, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, .6 );
            defRing ? timeline.to( defRing, .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 1.6 ) : null;
            rings   ? timeline.to( rings, 1, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, .6 ) : null;

        // Normalize Main bar
            mainBar ? timeline.to( mainBar, .5, { css: { scale: 1, y: '0', transformOrigin: '50% 0%' }, ease: Power2.easeOut }, .1 ) : null;

        // Normalize Overlays/Menu Buttons
            menuBtns ? timeline.to( overlays, .5, { css: { scale: 1, y: '0', transformOrigin: '50% 0%' }, ease: Power2.easeOut }, .1 ) : null;
            menuBtns ? timeline.to( menuBtns, .5, { css: { scale: 1, y: '0px', transformOrigin: '50% 0%' }, ease: Power2.easeOut }, .1 ) : null;

    }

    export function switchToLeftEmblem( index, cb ) {

        const mainEmb   = document.querySelector( '#mainEmblem' );
        const leftEmb   = document.querySelector( '#emblemLeft' );
        const rightEmb  = document.querySelector( '#emblemRight' );
        const charBackM = document.querySelector( '.char_back' );
        const charBackL = document.querySelector( '.char_back.left' );
        const charBackR = document.querySelector( '.char_back.right' );
        const mainBar   = document.querySelector( '.main_bar' );
        const overlays  = document.querySelector('.overlays');
        const menuBtns  = document.querySelector( '.menu_button_container' );
        const ghost     = document.querySelector( '.ghost' );
        const ghostEye  = document.querySelector( '.ghost_eye' );
        const defRing   = document.querySelector( '.default_ring' );
        const rings     = document.querySelector( '.rings' );

        let timeline = new TimelineMax();


        // Hide Main Emblem / Char Back
            timeline.to( mainEmb , .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, 0.1 );
            timeline.to( charBackM, .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, 0.1 );

            // Reset Main Emblem for Reveal
                timeline.set( mainEmb, { css: { scale: 1, y: 0 } }, .35 );

        // Hide Right Emblem / Char Back
            rightEmb ? timeline.to( rightEmb , .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, 0.1 ) : null;
            rightEmb ? timeline.to( charBackR, .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, 0.1 ) : null;

        // Hide Main Bar / Overlays / Menu Buttons
            mainBar  ? timeline.to( mainBar , .25, { css: { scale: 0 }, ease: Power2.easeOut }, 0.1 ) : null;
            menuBtns ? timeline.to( overlays, .25, { css: { scale: 0 }, ease: Power2.easeOut }, 0.1 ) : null;
            menuBtns ? timeline.to( menuBtns, .25, { css: { scale: 0 }, ease: Power2.easeOut }, 0.1 ) : null;

        // Eye Left, Scan to Mid
            timeline.to( ghostEye, .1, { css: { x: -2, y: 2 }, ease: Power2.easeOut },  0 );
            timeline.to( ghostEye, .5, { css: { x: 0        }, ease: Power2.easeOut }, .1 );
            timeline.to( ghostEye, .5, { css: { y: 0        }, ease: Power2.easeOut }, .6 );

        // Rotate Left Character to Front
            timeline.to( leftEmb,   .5, { css: { scale: .6, x: 0, y: 190 }, ease: Power2.easeOut }, 0.1 );
            timeline.to( charBackL, .5, { css: { scale: .4, x: 0, y: 200 }, ease: Power2.easeOut }, 0.1 );

        // Focus Left Emblem / Char Back
            timeline.to( leftEmb  , .5,  { css: { scale: 1.33, y: 8 }, ease: Power2.easeOut }, .6 );
            timeline.to( leftEmb  , .35, { autoAlpha: 0, ease: Power2.easeOut  }, .6 );
            timeline.to( charBackL, .5,  { css: { scale: 1, y: 0, autoAlpha: 0 }, ease: Power2.easeOut }, .6 );

        // Switch Emblem Visibilities
            timeline.to( mainEmb, .15, { autoAlpha: 1 }, .85 );

        // Trigger State Change
            timeline.call( cb, [ index ], null, .85 );

        // Show Main bar / Overlays / Menu Buttons
            mainBar  ? timeline.to( mainBar , .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.1 ) : null;
            menuBtns ? timeline.to( overlays, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.1 ) : null;
            menuBtns ? timeline.to( menuBtns, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.1 ) : null;


        // Recenter Ghost / Def Ring / Rings
            timeline.to( ghost, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.3 );
            rings   ? timeline.to( rings, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.3 ) : null;
            defRing ? timeline.to( defRing, .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 2 ) : null;

    }

    export function switchToRightEmblem( index, cb ) {

        const mainEmb   = document.querySelector( '#mainEmblem' );
        const leftEmb   = document.querySelector( '#emblemLeft' );
        const rightEmb  = document.querySelector( '#emblemRight' );
        const charBackM = document.querySelector( '.char_back' );
        const charBackL = document.querySelector( '.char_back.left' );
        const charBackR = document.querySelector( '.char_back.right' );
        const mainBar   = document.querySelector( '.main_bar' );
        const overlays  = document.querySelector('.overlays');
        const menuBtns  = document.querySelector( '.menu_button_container' );
        const ghost     = document.querySelector( '.ghost' );
        const ghostEye  = document.querySelector( '.ghost_eye' );
        const defRing   = document.querySelector( '.default_ring' );
        const rings     = document.querySelector( '.rings' );

        let timeline = new TimelineMax();


        // Hide Main Emblem / Char Back
            timeline.to( mainEmb , .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, .1 );
            timeline.to( charBackM, .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, .1 );

            // Reset Main Emblem for Reveal
                timeline.set( mainEmb, { css: { scale: 1, y: 0 } }, .35 );

        // Hide Left Emblem / Char Back
            timeline.to( leftEmb  , .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, .1 );
            timeline.to( charBackL, .25, { css: { scale: 0, autoAlpha: 0 }, ease: Power2.easeOut }, .1 );

        // Hide Main Bar / Overlays / Menu Buttons
            mainBar  ? timeline.to( mainBar , .25, { css: { scale: 0 }, ease: Power2.easeOut }, .1 ) : null;
            menuBtns ? timeline.to( overlays, .25, { css: { scale: 0 }, ease: Power2.easeOut }, .1 ) : null;
            menuBtns ? timeline.to( menuBtns, .25, { css: { scale: 0 }, ease: Power2.easeOut }, .1 ) : null;

        // Eye Right, Scan to Mid
            timeline.to( ghostEye, .1, { css: { x: 2, y: 2  }, ease: Power2.easeOut },  0 );
            timeline.to( ghostEye, .5, { css: { x: 0        }, ease: Power2.easeOut }, .1 );
            timeline.to( ghostEye, .5, { css: { y: 0        }, ease: Power2.easeOut }, .6 );

        // Rotate Right Character to Front
            timeline.to( rightEmb,  .5, { css: { scale: .6, x: 0, y: 190 }, ease: Power2.easeOut }, .1 );
            timeline.to( charBackR, .5, { css: { scale: .4, x: 0, y: 200 }, ease: Power2.easeOut }, .1 );

        // Focus Right Emblem / Char Back
            timeline.to( rightEmb , .5, { css: { scale: 1.33, y: 8 }, ease: Power2.easeOut }, .6 );
            timeline.to( rightEmb , .35, { autoAlpha: 0, ease: Power2.easeOut  }, .6 );
            timeline.to( charBackR, .5, { css: { scale: 1, y: 0, autoAlpha: 0 }, ease: Power2.easeOut }, .6 );

        // Switch Emblem Visibilities
            timeline.to( mainEmb, .15, { autoAlpha: 1 }, .85 );

        // Trigger State Change
            timeline.call( cb, [ index ], null, .85 );

        // Show Main bar / Overlays / Menu Buttons
            mainBar  ? timeline.to( mainBar , .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.1 ) : null;
            menuBtns ? timeline.to( overlays, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.1 ) : null;
            menuBtns ? timeline.to( menuBtns, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.1 ) : null;

        // Recenter Ghost / Def Ring / Rings
            timeline.to( ghost, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.3 );
            rings   ? timeline.to( rings, .75, { css: { scale: 1, y: 0 }, ease: Power2.easeOut }, 1.3 ) : null;
            defRing ? timeline.to( defRing, .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 2 ) : null;

    }