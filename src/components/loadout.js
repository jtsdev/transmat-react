

import React                   from 'react'
import TypeFocus               from '../components/type_focus'
import Subclass                from '../containers/Subclass'
import GearBar                 from '../components/gear_bar'
import { TweenMax,
         Power2,
         Back,
         Linear,
         TimelineLite,
         TimelineMax   }    from "gsap";


class Loadout_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

    }

    render() {

        const intType     = this.props.interfaceType,
              focType     = this.props.typeFocus,
              focSide     = this.props.focSide,
              barDepth    = this.props.switcher,
              items       = this.props.items,
              focSubclass = this.props.focSubclass;

        const gearBars  = !( intType === 'type_focus' || intType === 'inventory_focus' || intType === 'subclass_focus' || intType === 'stored_focus' || intType === 'item_details' || intType === 'item_actions' );
        const typeFocus = intType === 'type_focus' || intType === 'stored_focus';

        let leftItems = [], rightItems = [], focusItems = [], subclassItems = [];
        let eqpLeft = [], eqpRight = [];


        // Sort Left, Right, and Subclass Items
            for ( let i = 0; i < items.length; i++ ) {

                switch ( items[ i ].inventory.bucketTypeHash ) {

                    case 1498876634:   leftItems.push( items[ i ] );     break;     // kinetic
                    case 2465295065:   leftItems.push( items[ i ] );     break;     // energy
                    case 953998645:    leftItems.push( items[ i ] );     break;     // power
                    case 4023194814:   leftItems.push( items[ i ] );     break;     // ghost
                    case 284967655:    leftItems.push( items[ i ] );     break;     // ship
                    case 2025709351:   leftItems.push( items[ i ] );     break;     // vehicle

                    case 3448274439:   rightItems.push( items[ i ] );    break;     // helmet
                    case 3551918588:   rightItems.push( items[ i ] );    break;     // gauntlets
                    case 14239492:     rightItems.push( items[ i ] );    break;     // chest
                    case 20886954:     rightItems.push( items[ i ] );    break;     // legs
                    case 1585787867:   rightItems.push( items[ i ] );    break;     // class item
                    case 4292445962:   rightItems.push( items[ i ] );    break;     // clan banner
                    case 4274335291:   rightItems.push( items[ i ] );    break;     // emblem
                    case 3054419239:   rightItems.push( items[ i ] );    break;     // emotes

                    case 3284755031:   subclassItems.push( items[ i ] ); break;     // subclass

                    default:

                        focusItems.push( items[ i ] );

                }

            }


        // Sort Equipped Items - Left
            for ( let i = 0; i < leftItems.length; i++ ) {

                leftItems[ i ].isEquipped ? eqpLeft.push( leftItems[ i ] ) : null;

            }

        // Sort Equipped Items - Right
            for ( let i = 0; i < rightItems.length; i++ ) {

                rightItems[ i ].isEquipped ? eqpRight.push( rightItems[ i ] ) : null;

            }


        return (

            <div className="loadout">

                {
                    gearBars ?

                    <GearBar equipped={ eqpLeft } subclass={ subclassItems } barType={ 'left' } barDepth={ barDepth } typeFocus={ focType } /> : null
                }
                {
                    typeFocus ?

                    <TypeFocus items={ getFocusItems( focSide, getBuckId( focType ), leftItems, rightItems ) } focus={ focType } /> : null
                }
                {
                    intType === 'subclass_focus' ?

                    <Subclass items={ subclassItems } focusSubclass={ focSubclass } focus={ focType } /> : null
                }
                {
                    gearBars ?

                    <GearBar equipped={ eqpRight } barType={ 'right' } barDepth={ barDepth } typeFocus={ focType } /> : null
                }

            </div>

        )

    }

}


// Helpers

    function getFocusItems( focSide, buckId, leftItems, rightItems ) {

        return focSide === 'left' ? focusItems( buckId, leftItems ) : focusItems( buckId, rightItems )

    }

    export function focusItems( buckId, items ) {

        let focusItems = [];

        for ( let i = 0; i < items.length; i++ ) {

            if ( items[ i ].inventory.bucketTypeHash === buckId ) {

                focusItems.push( items[ i ] );

            }

        }

        return focusItems;

    }

    export function getBuckId( slot ) {

        switch ( slot ) {

            case 'left1':        return 1498876634;
            case 'left2':        return 2465295065;
            case 'left3':        return 953998645;
            case 'left4':        return 4023194814;
            case 'left6':        return 284967655;
            case 'left7':        return 2025709351;

            case 'right1':       return 3448274439;
            case 'right2':       return 3551918588;
            case 'right3':       return 14239492;
            case 'right4':       return 20886954;
            case 'right5':       return 1585787867;
            case 'right6':       return 4292445962;

            case 'right8':       return 4274335291;
            case 'right9':       return 3054419239;

            default:

                return 'unknown';

        }

    }


export default Loadout_Comp