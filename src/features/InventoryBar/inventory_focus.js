
import React  from 'react'
import Slot   from '../../containers/Slot'

import { Power2,
         TimelineMax  }    from "gsap";


class InventoryFocus extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        inventoryBucketScan( this.props.focusType );

    }

    handleClick( e, index ) {

        // e.stopPropagation();

    }

    render() {

        let invType   = this.props.focusType;

        let header    = buildHeader( invType );

        let slotCount = 50;
        let slots     = buildBucket( slotCount, this.props.items );

        return (

            <div className="inventory_focus_bar">

                <div className="inventory_focus">

                    <div className={ "inventory_focus_header " + invType }>
                        { header }
                    </div>
                    <div className={ "inventory_bucket " + invType } onClick={ ( e ) => this.handleClick( e ) }>
                        {
                            slots
                        }
                    </div>
                </div>

            </div>
        )

    }

}


// Inventory Bucket Animations

    export function inventoryBucketScan( invType ) {

        const bucket = document.querySelector( '.inventory_focus' );

        let timeline = new TimelineMax();

        if ( invType === 'cons' ) {

            timeline.set( bucket, { css: { scaleY: .1, scaleX: .33, transformOrigin: '0 0', autoAlpha: 0 } }, 0 );
            timeline.to( bucket, .5, { css: { scaleY: 1, scaleX: 1, autoAlpha: 1 }, ease: Power2.easeOut }, .05 );


        } else if ( invType === 'mods' ) {

            timeline.set( bucket, { css: { scaleY: .1, scaleX: .33, transformOrigin: '50% 0', autoAlpha: 0 } }, 0 );
            timeline.to( bucket, .5, { css: { scaleY: 1, scaleX: 1, autoAlpha: 1 }, ease: Power2.easeOut }, .05 );


        } else {

            timeline.set( bucket, { css: { scaleY: .1, scaleX: .33, transformOrigin: '100% 0', autoAlpha: 0 } }, 0 );
            timeline.to( bucket, .5, { css: { scaleY: 1, scaleX: 1, autoAlpha: 1 }, ease: Power2.easeOut }, .05 );

        }

    }


// Helpers

    function buildHeader( invType ) {

        if ( invType === 'cons' ) { return <h5 className="header_left">Consumables</h5> }
        else if( invType === 'mods' ) { return <h5 className="header_mid">Modifications</h5> }
        else { return <h5 className="header_right">Shaders</h5> }

    }

    function buildBucket( slotCount, items ) {

        let slots = [];

        for ( let i = 0; i < slotCount; i++ ) {

            slots.push(
                <Slot slotType={ 'inv_bucket_slot' } item={ items[ i ] } side={ 'bottom'  } pos={ i + 1 } key={ i } />
            )

        }

        return slots;

    }


export default InventoryFocus