

import React                   from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import Slot                    from '../containers/Slot'
import { TweenMax,
         Power2,
         Back,
         Linear,
         TimelineLite,
         TimelineMax   }    from "gsap";


class GearBar extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {

            barType: props.barType

        };

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        const gearBarLeft  = document.querySelector( '.gear_bar_left' );
        const gearBarRight = document.querySelector( '.gear_bar_right' );

        TweenMax.fromTo( gearBarLeft, .5, { css: { scaleX: 0, transformOrigin: '0% 50%' } }, { css: { scaleX: 1, transformOrigin: '0% 50%' }, ease: Power2.easeOut } );
        TweenMax.fromTo( gearBarRight, .5, { css: { scaleX: 0, transformOrigin: '100% 50%' } }, { css: { scaleX: 1, transformOrigin: '100% 50%' }, ease: Power2.easeOut } );

    }

    handleClick() {

    }

    render() {

        let classType,
            payload;

        const barType  = this.props.barType,
              barDepth = this.props.barDepth,
              focus    = this.props.typeFocus,
              equipped = this.props.equipped,
              subclass = this.props.subclass;

        const itemObj  = buildItemObject( barType, equipped );


        // Build Left Bar
            if ( barType == 'left' ) {

                const subObj  = buildSubclassObject( subclass );
                classType     = 'gear_bar_left';
                payload       = leftBarRouter( barDepth, subObj, itemObj, focus, this.handleClick );

        // Build Right Bar
            } else {

                classType = 'gear_bar_right';
                payload   = rightBarRouter( barDepth, itemObj, focus, this.handleClick );

            }

        return (

                <div className={ classType }>
                    <div className="height_adjustor">
                        { payload }
                    </div>
                </div>

        )

    }

}

// Build Left Bar
    function leftBarRouter( barDepth, subObj, itemObj, focus, handleClick ) {

        return barDepth === 'front' ?

            <div className="left_adjustor">
                <div className={ 'subclass_border' }>
                    <Slot slotType={ 'subclass' } item={ subObj.subclass } side={ 'left' } pos={ 0 } focus={ focus } clickCall={ handleClick }/>
                </div>
                <Slot slotType={ 'slot' }     item={ itemObj.primary } side={ 'left' } pos={ 1 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' }     item={ itemObj.special } side={ 'left' } pos={ 2 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' }     item={ itemObj.heavy }   side={ 'left' } pos={ 3 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' }     item={ itemObj.ghost }   side={ 'left' } pos={ 4 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' }                              side={ 'left' } pos={ 5 } focus={ focus } clickCall={ handleClick }/>
            </div>
            :
            <div>
                <div className={ 'subclass_border hidden_sub' }>
                    <Slot slotType={ 'subclass' } item={ subObj.subclass } side={ 'left' } pos={ 0 } focus={ focus } clickCall={ handleClick }/>
                </div>
                <Slot slotType={ 'slot' }     item={ itemObj.ship }    side={ 'left' } pos={ 6 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' }     item={ itemObj.vehicle } side={ 'left' } pos={ 7 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' }                              side={ 'left' } pos={ 9 } focus={ focus } clickCall={ handleClick }/>
            </div>

    }

// Build Right Bar
    function rightBarRouter( barDepth, itemObj, focus, handleClick ) {

        return barDepth === 'front' ?

            <div>
                <div className="gear_bar_spacer"></div>
                <Slot slotType={ 'slot' } item={ itemObj.head }       side={ 'right' } pos={ 1 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' } item={ itemObj.arms }       side={ 'right' } pos={ 2 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' } item={ itemObj.chest }      side={ 'right' } pos={ 3 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' } item={ itemObj.legs }       side={ 'right' } pos={ 4 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' } item={ itemObj.classItem }  side={ 'right' } pos={ 5 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' } item={ itemObj.clanBanner } side={ 'right' } pos={ 6 } focus={ focus } clickCall={ handleClick }/>
            </div>
            :
            <div>
                <div className="gear_bar_spacer"></div>
                <Slot slotType={ 'slot' } item={ itemObj.emblem } side={ 'right' } pos={ 8 } focus={ focus } clickCall={ handleClick }/>
                <Slot slotType={ 'slot' } item={ itemObj.emote }  side={ 'right' } pos={ 9 } focus={ focus } clickCall={ handleClick }/>
            </div>;

    }



function buildItemObject ( side, items ) {

    return  side === 'left' ? leftItems( items ) : rightItems( items );

}

function leftItems( items ) {

    let obj = {};

    for ( let i = 0; i < items.length; i++ ) {

        switch ( items[ i ].inventory.bucketTypeHash ) {

            case 1498876634:   obj.primary = items[ i ];     break;
            case 2465295065:   obj.special = items[ i ];     break;
            case 953998645:    obj.heavy   = items[ i ];     break;
            case 4023194814:   obj.ghost   = items[ i ];     break;
            case 284967655:    obj.ship    = items[ i ];     break;
            case 2025709351:   obj.vehicle = items[ i ];     break;

        }

    }

    return obj;

}

function rightItems( items ) {

    let obj = {};

    for ( let i = 0; i < items.length; i++ ) {

        switch ( items[ i ].inventory.bucketTypeHash ) {

            case 3448274439:   obj.head       = items[ i ];     break;
            case 3551918588:   obj.arms       = items[ i ];     break;
            case 14239492:     obj.chest      = items[ i ];     break;
            case 20886954:     obj.legs       = items[ i ];     break;
            case 1585787867:   obj.classItem  = items[ i ];     break;
            case 4292445962:   obj.clanBanner = items[ i ];     break;
            case 4274335291:   obj.emblem     = items[ i ];     break;
            case 3054419239:   obj.emote      = items[ i ];     break;

        }

    }

    return obj;

}


function buildSubclassObject( subclasses ) {

    let obj = {};

    for ( let i = 0; i < subclasses.length; i++ ) {

        if ( subclasses[ i ].isEquipped ) { obj.subclass = subclasses[ i ] }

    }

    return obj;

}


export default GearBar