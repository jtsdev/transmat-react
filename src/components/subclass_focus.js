

import React  from 'react'
import Slot   from '../containers/Slot'

import { TweenMax,
         Power2,
         Back,
         Linear,
         TimelineLite,
         TimelineMax   }    from "gsap";



class SubclassFocus extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        const eqpSub    = getEquipped( this.props.items );
        const activeSub = this.props.subFocus;

        if ( eqpSub !== activeSub ) {

            this.props.onSwitchSub( eqpSub );

        }

        subclassEnterAnimation();

    }

    handleClick( index, item, e ) {

        e.stopPropagation();

    }

    render() {

        const subclasses   = {}; //this.props.items;
        const activeSub    = { displayProperties: {}}; //this.props.subFocus;
        const altSubs      = {}; //getUnfocused( subclasses, activeSub );

        const title        = 'Subclass'; //activeSub.displayProperties.name.toUpperCase();
        const dmgType      = 'Solar'; //getDamageTypeName( activeSub.displayProperties.name );
        const activeEqp    = activeSub.isEquipped;

        const talents      = {}; //parseTalents( activeSub.talentDef, activeSub.nodeStates );

        const super0       = talents.super;

        const specials     = []; //talents.classSpecialties;
        const movements    = []; //talents.movementModes;
        const grenades     = []; //talents.grenades;
        const firstPath    = []; //talents.firstPath;
        const secondPath   = []; //talents.secondPath;

        const firstProps   = { name: 'Demo' }; //talents.firstPathProps;
        const secondProps  = { name: 'Demo' }; talents.secondPathProps;

        const activeTop    = 'node1'; //findActiveGrenade( grenades );
        const activeBottom = 'node2'; //findActiveMovement( movements );
        const activeLeft   = 'node0'; //findActiveSpecial( specials );
        const activePath   = 'firstPath'; //findActivePath( firstPath );

        return (

            <div className="subclass_focus_bar">

                <div className="subclass_focus">

                    <div className={ "subclass_container " + dmgType }>

                        <div className="subclass_anchor center">

                            <div id="top_line" className={ activeTop } />
                            <div id="left_line" className={ activeLeft } />
                            <div id="bottom_line" className={ activeBottom } />

                            <div id={ activePath } />

                            <div id="anchor_outline" className="cluster_container" />
                            <div className="cluster_container top">
                                <div className="subclass_cluster">
                                    <TalentNode node={ grenades[ 2 ] } onClick={ ( e ) => this.handleClick( 'top1', grenades[ 2 ], e ) } />
                                    <TalentNode node={ grenades[ 0 ] } onClick={ ( e ) => this.handleClick( 'top2', grenades[ 0 ], e ) } />
                                    <TalentNode node={ grenades[ 1 ] } onClick={ ( e ) => this.handleClick( 'top0', grenades[ 1 ], e ) } />
                                    <div className="node_spacer"></div>
                                </div>
                            </div>
                            <div className="cluster_container left">
                                <div className="subclass_cluster">
                                    <TalentNode node={ specials[ 0 ] } onClick={ ( e ) => this.handleClick( 'left0', specials[ 0 ], e ) } />
                                    <div className="node_spacer"></div>
                                    <div className="node_spacer"></div>
                                    <TalentNode node={ specials[ 1 ] } onClick={ ( e ) => this.handleClick( 'left1', specials[ 1 ], e ) } />
                                </div>
                            </div>
                            <div className="cluster_container bottom">
                                <div className="subclass_cluster">
                                    <div className="node_spacer"></div>
                                    <TalentNode node={ movements[ 2 ] } onClick={ ( e ) => this.handleClick( 'bottom2', movements[ 2 ], e ) } />
                                    <TalentNode node={ movements[ 0 ] } onClick={ ( e ) => this.handleClick( 'bottom0', movements[ 0 ], e ) } />
                                    <TalentNode node={ movements[ 1 ] } onClick={ ( e ) => this.handleClick( 'bottom1', movements[ 1 ], e ) } />
                                </div>
                            </div>

                            <div className="cluster_container top_right">
                                <h4 className="subclass_subheader">{ firstProps.name.toUpperCase() }</h4>
                                {
                                    activePath === 'firstPath' ? <div id="cluster_outline" className="cluster_container" /> : null
                                }
                                <div className="subclass_cluster">
                                    <TalentNode node={ firstPath[ 2 ] } onClick={ ( e ) => this.handleClick( 'top_right2', firstPath[ 2 ], e ) } />
                                    <TalentNode node={ firstPath[ 3 ] } onClick={ ( e ) => this.handleClick( 'top_right3', firstPath[ 3 ], e ) } />
                                    <TalentNode node={ firstPath[ 1 ] } onClick={ ( e ) => this.handleClick( 'top_right1', firstPath[ 1 ], e ) } />
                                    <TalentNode node={ firstPath[ 0 ] } onClick={ ( e ) => this.handleClick( 'top_right0', firstPath[ 0 ], e ) } />
                                </div>
                            </div>
                            <div className="cluster_container bottom_right">
                                <h4 id="bottom_subheader" className="subclass_subheader">{ secondProps.name.toUpperCase() }</h4>
                                {
                                    activePath === 'secondPath' ? <div id="cluster_outline" className="cluster_container" /> : null
                                }
                                <div className="subclass_cluster">
                                    <TalentNode node={ secondPath[ 2 ] } onClick={ ( e ) => this.handleClick( 'bottom_right2', secondPath[ 2 ], e ) } />
                                    <TalentNode node={ secondPath[ 3 ] } onClick={ ( e ) => this.handleClick( 'bottom_right3', secondPath[ 3 ], e ) } />
                                    <TalentNode node={ secondPath[ 1 ] } onClick={ ( e ) => this.handleClick( 'bottom_right1', secondPath[ 1 ], e ) } />
                                    <TalentNode node={ secondPath[ 0 ] } onClick={ ( e ) => this.handleClick( 'bottom_right0', secondPath[ 0 ], e ) } />
                                </div>
                            </div>

                            <div id="core_outline" className="cluster_container" />
                            <div className="subclass_core" onClick={ ( e ) => this.handleClick( 'center0', super0[ 0 ], e ) }>
                                {/* <img className="subclass_talent_icon center" src={ 'https://bungie.net' + super0[ 0 ].displayProperties.icon } /> */}
                            </div>
                        </div>

                    </div>

                    <div className="character_subclasses">

                        <Slot slotType={ 'subclass' } item={ activeSub } side={ 'subFocus' } pos={ 0 } onSubFocusClick={ this.handleClick }/>
                        {
                            altSubs[ 0 ] ?
                                <Slot slotType={ 'subclass_unfocused' } item={ altSubs[ 0 ] } side={ 'unfoc' } pos={ 0 } onSubFocusClick={ this.handleClick }/> : <div className="unfoc0 gray" />
                        }
                        {
                            altSubs[ 1 ] ?
                                <Slot slotType={ 'subclass_unfocused' } item={ altSubs[ 1 ] } side={ 'unfoc' } pos={ 1 } onSubFocusClick={ this.handleClick }/> : <div className="unfoc1 gray" />
                        }

                        <div className="subclass_focus_header">
                            <h5 className="header_top">{ title }</h5>
                        </div>

                        {
                            activeEqp ?

                                <div className="equipped_subclass"><p>Equipped</p></div> : <div className="equip_subclass"><p>Equip</p></div>
                        }

                    </div>

                </div>

            </div>
        )

    }

}


class TalentNode extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick() {}

    render() {

        const url  = 'https://bungie.net';
        const node = {}; //this.props.node;

        return (

            <div className={ node.isActive ? 'subclass_node active' : 'subclass_node' }>
                {/* <img className="subclass_talent_icon" src={ url + node.displayProperties.icon } /> */}
            </div>

        )

    }

}


// Helpers

    function getEquipped( items ) {

        for ( let i = 0; i < items.length; i++ ) {

            if ( items[ i ].isEquipped ) { return items[ i ] }

        }

        return 'none';

    }

    function getUnfocused( items, active ) {

        let unequipped = [];

        for ( let i = 0; i < items.length; i++ ) {

            if ( items[ i ] !== active ) { unequipped.push( items[ i ] ) }

        }

        return unequipped;

    }

    function getDamageTypeName( subName ) {

        switch ( subName ) {

            case 'Arcstrider':      return 'arc';
            case 'Nightstalker':    return 'void';
            case 'Gunslinger':      return 'solar';

            case 'Stormcaller':     return 'arc';
            case 'Voidwalker':      return 'void';
            case 'Dawnblade':       return 'solar';

            case 'Striker':         return 'arc';
            case 'Sentinel':        return 'void';
            case 'Sunbreaker':      return 'solar';

            default:

                return 'solar';

        }

    }


    function findActiveGrenade( nodes ) {

        if ( nodes[ 0 ].isActive ) { return 'node1' }
        else if ( nodes[ 1 ].isActive ) { return 'node2' }
        else if ( nodes[ 2 ].isActive ) { return 'node0' }
        else { return 'none' }

    }
    function findActiveMovement( nodes ) {

        if ( nodes[ 0 ].isActive ) { return 'node1' }
        else if ( nodes[ 1 ].isActive ) { return 'node2' }
        else if ( nodes[ 2 ].isActive ) { return 'node0' }
        else { return 'none' }

    }
    function findActiveSpecial( nodes ) {

        if ( nodes[ 0 ].isActive ) { return 'node0' }
        else if ( nodes[ 1 ].isActive ) { return 'node1' }
        else { return 'none' }

    }
    function findActivePath( nodes ) {

        for ( let i = 0; i < nodes.length; i++ ) {

           if ( nodes[ i ].isActive ) { return 'firstPath' }

        }

        return 'secondPath';

    }

    function parseTalents( talentDef, states ) {

        let talentObj = {};
        let nodes = talentDef.nodes;

        talentObj.super            = parseSuper();

        talentObj.classSpecialties = parseClassSpecialties();
        talentObj.movementModes    = parseMovementModes();
        talentObj.grenades         = parseGrenades();
        talentObj.firstPath        = parseFirstPath();
        talentObj.secondPath       = parseSecondPath();

        talentObj.firstPathProps   = parseFirstPathProps();
        talentObj.secondPathProps  = parseSecondPathProps();

        function parseSuper() {

            let super0 = { ...nodes[ 10 ].steps[ 0 ] };

            return [ super0 ];

        }
        function parseClassSpecialties() {

            let special0 = { ...nodes[ 2 ].steps[ 0 ] };
            let special1 = { ...nodes[ 3 ].steps[ 0 ] };

            special0.isActive = states[ 2 ].isActivated;
            special1.isActive = states[ 3 ].isActivated;

            return [ special0, special1 ];
        }
        function parseGrenades() {

            let grenade0 = { ...nodes[ 7 ].steps[ 0 ] };
            let grenade1 = { ...nodes[ 8 ].steps[ 0 ] };
            let grenade2 = { ...nodes[ 9 ].steps[ 0 ] };

            grenade0.isActive = states[ 7 ].isActivated;
            grenade1.isActive = states[ 8 ].isActivated;
            grenade2.isActive = states[ 9 ].isActivated;

            return [ grenade0, grenade1, grenade2 ];

        }
        function parseMovementModes() {

            let movements0 = { ...nodes[ 4 ].steps[ 0 ] };
            let movements1 = { ...nodes[ 5 ].steps[ 0 ] };
            let movements2 = { ...nodes[ 6 ].steps[ 0 ] };

            movements0.isActive = states[ 4 ].isActivated;
            movements1.isActive = states[ 5 ].isActivated;
            movements2.isActive = states[ 6 ].isActivated;

            return [ movements0, movements1, movements2 ];

        }
        function parseFirstPath() {

            let firstPath0 = { ...nodes[ 11 ].steps[ 0 ] };
            let firstPath1 = { ...nodes[ 12 ].steps[ 0 ] };
            let firstPath2 = { ...nodes[ 13 ].steps[ 0 ] };
            let firstPath3 = { ...nodes[ 14 ].steps[ 0 ] };

            firstPath0.isActive = states[ 11 ].isActivated;
            firstPath1.isActive = states[ 12 ].isActivated;
            firstPath2.isActive = states[ 13 ].isActivated;
            firstPath3.isActive = states[ 14 ].isActivated;

            return [ firstPath0, firstPath1, firstPath2, firstPath3 ];

        }
        function parseSecondPath() {

            let secondPath0 = { ...nodes[ 15 ].steps[ 0 ] };
            let secondPath1 = { ...nodes[ 16 ].steps[ 0 ] };
            let secondPath2 = { ...nodes[ 17 ].steps[ 0 ] };
            let secondPath3 = { ...nodes[ 18 ].steps[ 0 ] };

            secondPath0.isActive = states[ 15 ].isActivated;
            secondPath1.isActive = states[ 16 ].isActivated;
            secondPath2.isActive = states[ 17 ].isActivated;
            secondPath3.isActive = states[ 18 ].isActivated;

            return [ secondPath0, secondPath1, secondPath2, secondPath3 ];

        }

        function parseFirstPathProps() {

            let props = talentDef.nodeCategories[ 4 ].displayProperties;

            return { ...props };

        }
        function parseSecondPathProps() {

            let props = talentDef.nodeCategories[ 5 ].displayProperties;

            return { ...props };

        }

        return talentObj;

    }


// Animations

    function subclassEnterAnimation() {

        // --- Subclass Info ---

            // Subclass Back
                const subclassContainer = document.querySelector( '.subclass_container' );

            // Subclass Icons
                const focusSubclass = document.querySelector( '.subFocus0' );
                const unfoc0        = document.querySelector( '.unfoc0'    );
                const unfoc1        = document.querySelector( '.unfoc1'    );

            // Focus Header
                const focusHeader   = document.querySelector( '.subclass_focus_header' );

            // Equipped Header/Button
                const eqpBtn        = document.querySelector( '.equipped_subclass' );

        // --- Subclass Tree ---

            // Main Anchor
                const anchor        = document.querySelector( '.subclass_anchor.center' );
                const anchorOutline = document.querySelector( '#anchor_outline'         );

            // Core Node
                const core          = document.querySelector( '.subclass_core' );
                const coreOutline   = document.querySelector( '#core_outline'  );

            // Node Clusters

                // cluster_container
                    // subclass_cluster
                        // subclass_node ( active )
                        // node_spacer
                const clusterTop    = document.querySelector( '.cluster_container.top'          );
                const clusterLeft   = document.querySelector( '.cluster_container.left'         );
                const clusterBottom = document.querySelector( '.cluster_container.bottom'       );
                const clusterTRight = document.querySelector( '.cluster_container.top_right'    );
                const clusterBRight = document.querySelector( '.cluster_container.bottom_right' );

            // Connectors
                const lineTop       = document.querySelector( '#top_line'    );
                const lineLeft      = document.querySelector( '#left_line'   );
                const lineBottom    = document.querySelector( '#bottom_line' );
                const lineTRight    = document.querySelector( '#firstPath'   );
                const lineBRight    = document.querySelector( '#secondPath'  );

        let coords = subclassContainer.getBoundingClientRect();

        let dY = coords.height * -.45;
        let dX = coords.width  * -.25;
        // console.log( dY, dX );
        // console.log(coords);

        let timeline = new TimelineMax();

        // timeline.set( anchor, { css: { x: 32, y: -60 } }, 0 );
        // timeline.set( anchor, { css: { left: '24%', top: '9%' } }, 0 );
        timeline.set( anchor, { css: { x: dX + 25, y: dY, autoAlpha: 0 } }, 0 );
        timeline.set( core, { css:{ autoAlpha: 0 } }, 0 );
        // timeline.to( core, .3, { autoAlpha: 1, ease: Power2.easeOut }, 0 );

        timeline.fromTo( subclassContainer, 1, { css: { scaleY: 0, transformOrigin: '50% 0' } }, { css: { scaleY: 1 }, ease: Power2.easeOut }, 0 );

        timeline.fromTo( focusSubclass, .5, { css: { scale: 0 } }, { css: { scale: 1 }, ease: Power2.easeOut }, .5 );
        timeline.fromTo( focusHeader, .5, { css: { scaleX: 0, transformOrigin: '0 50%' } }, { css: { scaleX: 1 }, ease: Power2.easeOut }, 1 );
        timeline.fromTo( eqpBtn, .25, { css: { scaleY: 0, transformOrigin: '50% 0' } }, { css: { scaleY: 1 }, ease: Power2.easeOut }, 1.5 );

        unfoc0 ? timeline.fromTo( unfoc0, .5, { css: { scale: 0 } }, { css: { scale: 1 }, ease: Power2.easeOut }, 1.5 ) : null;
        unfoc1 ? timeline.fromTo( unfoc1, .5, { css: { scale: 0 } }, { css: { scale: 1 }, ease: Power2.easeOut }, 1.5 ) : null;


        timeline.to( anchor, .5, { css: { x: 0, y: 0, autoAlpha: 1 }, ease: Power2.easeOut }, 1.5 );


        // timeline.fromTo( core, 1, { css: { scale: .5, left: '3%', top: '14%' } }, { css: { scale: 1, left: '', top: '' }, ease: Power2.easeOut }, 2 );
        timeline.fromTo( core, 1, { css: { scale: .5, autoAlpha: .2 } }, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 2 );
        timeline.fromTo( coreOutline, .5, { css: { scale: 2, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: .2 }, ease: Power2.easeOut }, 3 );

        timeline.fromTo( anchorOutline, .5, { css: { scale: .5, autoAlpha: 0 } }, { css: { scale: 1, autoAlpha: .2 }, ease: Power2.easeOut }, 3.5 );

        timeline.fromTo( clusterTop   , .5, { css: { scale: 0 } }, { css: { scale: 1, transformOrigin: '100% 50%' }, ease: Power2.easeOut }, 4 );
        timeline.fromTo( clusterLeft  , .5, { css: { scale: 0 } }, { css: { scale: 1 }, ease: Power2.easeOut }, 4 );
        timeline.fromTo( clusterBottom, .5, { css: { scale: 0 } }, { css: { scale: 1 }, ease: Power2.easeOut }, 4 );

        lineTop    ? timeline.fromTo( lineTop   , .25, { autoAlpha: 0 }, { autoAlpha: 1 }, 5 ) : null;
        lineLeft   ? timeline.fromTo( lineLeft  , .25, { autoAlpha: 0 }, { autoAlpha: 1 }, 5 ) : null;
        lineBottom ? timeline.fromTo( lineBottom, .25, { autoAlpha: 0 }, { autoAlpha: 1 }, 5 ) : null;

        // timeline.to( anchor, .75, { css: { x: 0, y: 0 }, ease: Power2.easeInOut }, 5.25 );

        timeline.fromTo( clusterTRight, .75, { css: { scale: .8, x: 250, y: -250, autoAlpha: 0 } }, { css: { scale: 1, x: 0, y: 0, autoAlpha: 1 }, ease: Power2.easeOut }, 4 );
        timeline.fromTo( clusterBRight, .75, { css: { scale: .8, x: 250, y:  250, autoAlpha: 0 } }, { css: { scale: 1, x: 0, y: 0, autoAlpha: 1 }, ease: Power2.easeOut }, 4 );

        lineTRight ? timeline.fromTo( lineTRight, .25, { autoAlpha: 0 }, { autoAlpha: 1 }, 5 ) : null;
        lineBRight ? timeline.fromTo( lineBRight, .25, { autoAlpha: 0 }, { autoAlpha: 1 }, 5 ) : null;

    }


export default SubclassFocus