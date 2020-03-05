import React     from 'react'
import Emblem    from '../../components/emblem'
import ItemPerks from './item_perks'
import ItemStats from './item_stats'
import { TweenMax,
         Power2,
         TimelineMax   }   from "gsap";
import { equipItem,
         transferToVault } from '../../helpers/transfer'


class ItemOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        showItemOverlayAnimation();

    }

    handleClick( e, route ) {

        if ( route === 'transfer' ) {

            this.props.onTransfer();

            const itemDetails = document.querySelector( '.item_details' );

            itemDetails ? returnScannerAnimation() : showTypeFocusAnimation();

            document.querySelector( '.lower_wrap' ).style.transform = 'translateY(0) scale(1)';

        } else if ( route === 'back' ) {

            e.stopPropagation();

            this.props.onTransfer();

            const itemDetails = document.querySelector( '.item_details' );

            itemDetails ? returnScannerAnimation() : showTypeFocusAnimation();

            document.querySelector( '.ghost' ).classList.remove( 'actions' );
            document.querySelector( '.ghost' ).classList.add( this.props.ghost );
            document.querySelector( '.rings' ).classList.add( this.props.ghost );
            document.querySelector( '.lower_wrap' ).style.transform = 'translateY(0) scale(1)';

        } else if ( route === 'equip' ) {

            e.stopPropagation();

            const itemDetails = document.querySelector( '.item_details' );
            itemDetails ? returnScannerAnimation() : showTypeFocusAnimation();

            equipItem( this.props.focusItem, this.props.charModels, this.props.updateToggle, this.props.onUpdate );

            this.props.onTransfer();
            document.querySelector( '.lower_wrap' ).style.transform = 'translateY(0) scale(1)';

        } else if ( route === 'vault' ) {

            // VAULT BUTTON CLICK

            e.stopPropagation();

            const item     = this.props.focusItem;
            const chars    = this.props.charModels;
            const location = chars[ item.characterIndex ].characterId;

            transferToVault( item, location, chars[ 0 ], this.props.updateToggle, this.props.onUpdate );

            this.props.onTransfer();
            document.querySelector( '.lower_wrap' ).style.transform = 'translateY(0) scale(1)';

        } else {

            // TOGGLE ITEM DETAILS

            e.stopPropagation();

            let activeCard = document.querySelector( '.card_wrap.open' );

            if ( activeCard ) {

                activeCard.classList.remove( 'open' );

                document.querySelector( '.action_emblems' ).style.top = '61%';
                document.querySelector( '.item_details_card' ).classList.remove( 'active' );

                showEmblems();

            } else {

                hideEmblems();

                document.querySelector( '.card_wrap' ).classList.add( 'open' );

                document.querySelector( '.action_emblems' ).style.top = '110%';
                document.querySelector( '.item_details_card' ).classList.add( 'active' );

            }

        }

    }

    render() {

        const chars       = this.props.charModels,
              focus       = this.props.charFocus,
              item        = this.props.focusItem,
              itemSibs    = this.props.focusSibs,

              charInd     = item.characterIndex,

              backClass   = 'item_details_card',
              descClass   = 'item_description';

        let showEquip     = false,
            equippedPlate = false,
            vaultButton   = true,

            alts          = [],
            primStat      = '',
            charFocus,
            damageType;


        // Sort Focus and Alternate Characters
            for ( let i = 0; i < chars.length; i++ ) {

                if ( chars[ i ].characterIndex === focus ) {
                    charFocus = chars[ i ]
                } else {
                    alts.push( chars[ i ] )
                }

            }

        // Set Primary Stat and Damage Type if Available
            if ( item.instance ) {
                if ( item.instance.primaryStat ) {

                    primStat   = item.instance.primaryStat.value;
                    damageType = getDamageTypeName( item.instance.damageType );   // 1 - kinetic / 2 - arc / 3 -  / 4 - /

                }
            }

        // Toggle Equip Displays and Vault Button
            if ( item.characterIndex === charFocus.characterIndex ) {
                if ( item.isEquipped ) {

                    equippedPlate = true;

                } else {

                    showEquip = true;

                }
            } else if ( item.characterIndex === -1 ) {

                vaultButton = false;

            }

        return (

            <div className="item_overlay_bar">

                <div className="item_overlay" onClick={ ( e ) => this.handleClick( e, 'back' ) }>

                    <div className="card_wrap">

                        <div className={ backClass } onClick={ ( e ) => this.handleClick( e, 'toggle' ) }>
                            <div className={ descClass }>
                                <p>{ item.displayProperties.description }</p>
                            </div>
                            {
                                primStat !== '' ?
                                    <ItemPerks item={ item } /> : null
                            }
                            {
                                primStat !== '' ?
                                    <ItemStats item={ item } /> : null
                            }
                        </div>

                        <div className={ "item_summary_card " + item.inventory.tierTypeName } onClick={ ( e ) => this.handleClick( e, 'toggle' ) }>

                            <div className="summary_card_info">
                                <h4>{ item.displayProperties.name }</h4>
                                <p className="summary_card_type">{ item.itemTypeDisplayName }</p>
                                <p className="summary_card_power">{ primStat }</p>
                                <div className={ "summary_card_damage " + damageType } />
                            </div>

                        </div>

                    </div>

                    <div className="action_emblems">
                        <Emblem id={ charInd !== charFocus.characterIndex ? "actEmb1" : "actEmb1Gray" } charFocus={ charFocus } chars={ chars } itemFocus={ item } focusSibs={ itemSibs } embType={ 'transfer' } className={ "emblem action" } showStats={ false } charClass="Hunter" updateToggle={ this.props.updateToggle } updateCB={ this.props.onUpdate } clickClick={ ( e, item ) => this.handleClick( e, 'transfer' ) } />
                        {
                            alts[ 0 ] ?
                                <Emblem id={ charInd !== alts[ 0 ].characterIndex ? "actEmb2" : "actEmb2Gray" } charFocus={ alts[ 0 ] } chars={ chars } itemFocus={ item } focusSibs={ itemSibs } embType={ 'transfer' } className={ "emblem action" } showStats={ false } charClass="Titan" updateToggle={ this.props.updateToggle } updateCB={ this.props.onUpdate } clickClick={ ( e, item ) => this.handleClick( e, 'transfer' ) }/> : null

                        }
                        {
                            alts[ 1 ] ?
                                <Emblem id={ charInd !== alts[ 1 ].characterIndex ? "actEmb3" : "actEmb3Gray" } charFocus={ alts[ 1 ] } chars={ chars } itemFocus={ item } focusSibs={ itemSibs } embType={ 'transfer' } className={ "emblem action" } showStats={ false } charClass="Warlock" updateToggle={ this.props.updateToggle } updateCB={ this.props.onUpdate } clickClick={ ( e, item ) => this.handleClick( e, 'transfer' ) } /> : null

                        }
                        <div className={ vaultButton ? "to_vault_button" : "to_vault_button gray" } onClick={ ( e ) => this.handleClick( e, 'vault' ) }><div className="to_vault_icon" /><p>Vault</p></div>
                    </div>

                    {
                        showEquip ?
                            <div>
                                <div className="equip_button" onClick={ ( e ) => this.handleClick( e, 'equip' ) }><p>Equip</p></div>
                                <div className="equip_emblem_border" />
                            </div> : null
                    }
                    {
                        equippedPlate ?
                            <div>
                                <div className="equipped_plate"><p>Equipped</p></div>
                                <div className="equipped_plate_border" />
                            </div> : null
                    }

                    <div className="send_header"><p>Send</p></div>


                </div>

            </div>

        )

    }

}


// Animations

    function showItemOverlayAnimation() {

        const itemSummaryCard = document.querySelector( '.item_summary_card' );
        const summaryCardInfo = document.querySelector( '.summary_card_info' );
        const sendHeader      = document.querySelector( '.send_header' );
        const actionEmblems   = document.querySelectorAll( '.emblem.action' );
        const vaultButton     = document.querySelector( '.to_vault_button' );

        const equipButton     = document.querySelector( '.equip_button' );
        const equipBorder     = document.querySelector( '.equip_emblem_border' );
        const equipPlate      = document.querySelector( '.equipped_plate' );
        const plateBorder     = document.querySelector( '.equipped_plate_border' );

        const infoChildren    = summaryCardInfo.children;

        const itemName   = infoChildren[ 0 ];
        const itemType   = infoChildren[ 1 ];
        const itemPower  = infoChildren[ 2 ];
        const damageType = infoChildren[ 3 ];

        TweenMax.set( itemName  , { autoAlpha: 0 } );
        TweenMax.set( itemType  , { autoAlpha: 0 } );
        TweenMax.set( itemPower , { autoAlpha: 0 } );
        TweenMax.set( damageType, { autoAlpha: 0 } );
        TweenMax.set( itemSummaryCard, { css: { width: '0' } } );

        let timeline = new TimelineMax();


        // Expand Card Right
            timeline.to( itemSummaryCard, .5, { css: { width: '76.5625%', transformOrigin: '0 50%' }, ease: Power2.easeInOut }, 0 );


        // Show Info
            timeline.to( itemName  , .5, { autoAlpha: 1 }, .5 );
            timeline.to( itemType  , .5, { autoAlpha: 1 }, .5 );
            // timeline.to( itemPower , .5, { autoAlpha: 1 }, .5 );
            timeline.to( damageType, .5, { autoAlpha: 1 }, .5 );


        // Show Send
            timeline.fromTo( sendHeader, .75, { css: { scaleX: 0, transformOrigin: '100% 50%' } }, { css: { scaleX: 1 }, ease: Power2.easeOut }, .75 );

        for ( let i = 0; i < actionEmblems.length; i++ ) {

            let alphaValue = actionEmblems[ i ].id.includes( 'Gray' ) ? .4 : 1;

            // Reveal Action Emblem
                timeline.fromTo( actionEmblems[ i ], .75, { css: { x: 300, autoAlpha: 0 } }, { css: { x: 0, autoAlpha: alphaValue }, ease: Power2.easeOut }, .9 + i * .15 );

        // After All Action Emblems Have Been Revealed:
            if ( i === actionEmblems.length - 1 ) {

                let vaultAlpha = vaultButton.classList.contains( 'gray' ) ? .4 : 1;

            // Reveal Vault Button
                timeline.fromTo( vaultButton, .75, { css: { x: 300, autoAlpha: 0 } }, { css: { x: 0, autoAlpha: vaultAlpha }, ease: Power2.easeOut }, .9 + ( i + 1 ) * .15 );


                if ( equipButton ) {
                    timeline.fromTo( equipButton, .5, { css: { scaleX: 0 } }, { css: { scaleX: 1 }, ease: Power2.easeOut }, 1.65 );
                    timeline.fromTo( equipBorder, .75, { css: { scaleX: 0 } }, { css: { scaleX: 1 }, ease: Power2.easeOut }, 1.65 );
                }

                if ( equipPlate ) {
                    timeline.fromTo( equipPlate , .5, { css: { scaleX: 0 } }, { css: { scaleX: 1 }, ease: Power2.easeOut }, 1.65 );
                    timeline.fromTo( plateBorder, .75, { css: { scaleX: 0 } }, { css: { scaleX: 1 }, ease: Power2.easeOut }, 1.65 );
                }

            }

        }

    }

    export function showTypeFocusAnimation() {

        // const typeFocus   = document.querySelector( '.type_focus' );
        const typeHeader  = document.querySelector( '.type_focus_header' );
        const storedBar   = document.querySelector( '.stored_bar' );
        const focusSlot   = document.querySelector( '.slot.focus' );
        const buckSlots   = document.querySelectorAll( '.bucket_slot' );


        let timeline = new TimelineMax();

        for ( let i = 0; i < buckSlots.length; i++ ) {  const slot = buckSlots[ i ];

        // Normalize Bucket Slots
            timeline.to( slot   ,  .5, { css: { scale: 1, x: 0, y: 0, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );
            timeline.to( slot   ,   0, { css: { zIndex: 0 } }, .5 );

        }

        // Normalize Main Slot
            timeline.to( focusSlot  , .5, { css: { scale: 1, x: 0, y: 0, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );

        // Normalize Header
            timeline.to( typeHeader , .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );

        // Normalize Stored
            timeline.to( storedBar  , .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );

        // Level Main Slot
            timeline.set( focusSlot, { css: { zIndex: 0 } }, .5 );

    }

    export function returnScannerAnimation() {

        const typeFocus = document.querySelector( '.type_focus' );
        const storedBar = document.querySelector( '.stored_bar' );
        const invBar    = document.querySelector( '.inventory_bar' );
        const menuBtns  = document.querySelector( '.menu_button_container' );


        let timeline = new TimelineMax();


        // Normalize TypeFocus
            if ( typeFocus ) {

                timeline.to( typeFocus, .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 )  }

        // Normalize Stored
            if ( storedBar ) {

                timeline.to( storedBar, .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );
                timeline.to( '.stored_bucket_slot', .5, { autoAlpha: 1 }, 0 );  }

        // Normalize Inventory
            if ( invBar ) {

                timeline.to( invBar   , .5, { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeOut }, 0 );
                timeline.to( '.inv_bucket_slot', .5, { autoAlpha: 1 }, 0 );  }

        // Normalize Menu Buttons
            if ( menuBtns ) {

                timeline.to( menuBtns , .5, { autoAlpha: 1, ease: Power2.easeOut }, 0 );    }

    }


    function hideEmblems() {

        const sendHeader    = document.querySelector( '.send_header' );
        const actionEmblems = document.querySelectorAll( '.emblem.action' );
        const vaultButton   = document.querySelector( '.to_vault_button' );
        const equipButton   = document.querySelector( '.equip_button' );
        const equipBorder   = document.querySelector( '.equip_emblem_border' );
        const equipPlate    = document.querySelector( '.equipped_plate' );
        const plateBorder   = document.querySelector( '.equipped_plate_border' );


        let timeline = new TimelineMax();

        // Hide Send
            timeline.to( sendHeader, .1, { autoAlpha: 0 }, 0 );

        // Hide Action Emblems
            for ( let i = 0; i < actionEmblems.length; i++ ) {

                timeline.to( actionEmblems[ i ], .1, { autoAlpha: 0 }, 0 );

            }

        // Hide Vault Button
            timeline.to( vaultButton, .1, { autoAlpha: 0 }, 0 );

        // Hide Equip Button
            if ( equipButton ) {
                timeline.to( equipButton, .1, { css: { autoAlpha: 0 } }, 0 );
                timeline.to( equipBorder, .1, { css: { autoAlpha: 0 } }, 0 );
            }

        // Hide Equip Plate
            if ( equipPlate ) {
                timeline.to( equipPlate , .1, { css: { autoAlpha: 0 } }, 0 );
                timeline.to( plateBorder, .1, { css: { autoAlpha: 0 } }, 0 );
            }

    }

    function showEmblems() {

        const sendHeader    = document.querySelector( '.send_header' );
        const actionEmblems = document.querySelectorAll( '.emblem.action' );
        const vaultButton   = document.querySelector( '.to_vault_button' );
        const equipButton   = document.querySelector( '.equip_button' );
        const equipBorder   = document.querySelector( '.equip_emblem_border' );
        const equipPlate    = document.querySelector( '.equipped_plate' );
        const plateBorder   = document.querySelector( '.equipped_plate_border' );


        let timeline = new TimelineMax();

        // Show Send
            timeline.to( sendHeader, .25, { autoAlpha: 1 }, .2 );

        // Show Action Emblems
            for ( let i = 0; i < actionEmblems.length; i++ ) {

                timeline.to( actionEmblems[ i ], .25, { autoAlpha: 1 }, .2 );

            }

        // Show Vault Button
            timeline.to( vaultButton, .25, { autoAlpha: 1 }, .2 );

        // Show Equip Button
            if ( equipButton ) {
                timeline.to( equipButton, .25, { css: { autoAlpha: 1 } }, .2 );
                timeline.to( equipBorder, .25, { css: { autoAlpha: 1 } }, .2 );
            }

        // Show Equip Plate
            if ( equipPlate ) {
                timeline.to( equipPlate , .25, { css: { autoAlpha: 1 } }, .2 );
                timeline.to( plateBorder, .25, { css: { autoAlpha: 1 } }, .2 );
            }

    }


// Helpers

    function getDamageTypeName( damageType ) {

        switch ( damageType ) {

            case 0:     return 'none';
            case 1:     return 'kinetic';
            case 2:     return 'arc';
            case 3:     return 'solar';
            case 4:     return 'void';

            default:
                return 'none';

        }

    }


export default ItemOverlay