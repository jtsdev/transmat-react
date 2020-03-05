
import React                   from 'react'

import { deleteToken }         from '../../index'

import ItemOverlay             from './item_overlay'

import ProgressOverlay         from './progress_overlay'
import LoadoutsOverlay         from './loadouts_overlay'
import TowerOverlay            from './tower_overlay'

import SettingsOverlay         from './settings_overlay'
import AboutOverlay            from './about_overlay'

import { TweenMax,
         Linear,
         TimelineMax   }    from "gsap";


class OverlaysBar_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

        const overlay = document.querySelector( '.overlay' );

        let timeline = new TimelineMax();

        timeline.to( overlay, .25, { css: { scaleY: 0, transformOrigin: '50% 0' }, ease: Linear.easeNone }, 0 );
        timeline.call( this.props.onOverlaysClose, null, null, .25 );

    }

    render() {

        let payload;

        const item       = this.props.focusItem,
              allItems   = this.props.items,
              characters = this.props.charModels;

        let repItems     = { factions: [] },
            mailItems    = [],
            engrams      = [],
            vaultItems   = [];


        if ( allItems ) {

            const focusIndex = this.props.charFocus;

            for ( let i = 0; i < allItems.length; i++ ) {

                const thisItem = allItems[ i ];

                // Rep Items
                    if ( thisItem.inventory.bucketTypeHash === 1469714392 ) {

                        repItems.factions.push( thisItem );

                        // Catch rep items at the postmaster
                            if ( thisItem.bucketHash === 215593132 && thisItem.characterIndex === focusIndex ) {
                                mailItems.push( thisItem );
                            }

                // Postmaster
                    } else if ( thisItem.bucketHash === 215593132 && thisItem.characterIndex === focusIndex ) {

                        mailItems.push( thisItem );

                // Engrams
                    } else if ( thisItem.inventory.bucketTypeHash === 375726501 && thisItem.characterIndex === focusIndex ) {

                        engrams.push( thisItem );

                // Vault Items
                    } else if ( thisItem.characterIndex === -1 ) {

                        vaultItems.push( thisItem );

                }

            }

        }


        switch ( this.props.showOverlays ) {

            case 'about':
                payload = <AboutOverlay onClose={ this.handleClick } />;
                break;

            case 'settings':
                payload = <SettingsOverlay onClose={ this.handleClick } />;
                break;

            case 'logout':
                payload = <LogoutOverlay onClose={ this.props.onOverlaysClose } />;
                break;

            case 'actions':
                payload = <ItemOverlay charModels={ this.props.charModels } focusItem={ item } focusSibs={ getFocusSiblings( item, allItems ) } charFocus={ this.props.charFocus } onTransfer={ this.props.onOverlaysClose } updateToggle={ this.props.updateToggle } onUpdate={ this.props.onUpdateToggle } ghost={ this.props.ghost } />;
                break;

            case 'details':
                payload = <ItemOverlay focusItem={ item } ghost={ this.props.ghost } />;
                break;

            case 'progress':
                let char = characters[ this.props.charFocus ];
                payload = <ProgressOverlay charFocus={ char } repItems={ repItems } />;
                break;

            case 'loadouts':
                payload = <LoadoutsOverlay />;
                break;

            case 'tower':
                payload = <TowerOverlay engramItems={ engrams } postmasterItems={ mailItems } vaultItems={ vaultItems } />;
                break;

            default:
                payload = null;
        }

        const thisOver = this.props.showOverlays;

        return (

            <div className={ thisOver === 'settings' || thisOver === 'about' || thisOver === 'logout' ? "overlays blackBack" : "overlays" }>

                <div className="overlays_bar">

                { payload }

                </div>

            </div>

        )

    }

}




class LogoutOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        const overlay = document.querySelector( '.logout_prompt' );
        TweenMax.to( overlay, .25, { css: { scaleX: 1 }, ease: Linear.easeNone } );

    }

    handleClick( e, type ) {

        e.stopPropagation();

        const overlay = document.querySelector( '.logout_prompt' );

        let timeline = new TimelineMax();

        timeline.to( overlay, .25, { css: { scaleX: 0, transformOrigin: '100% 50%' }, ease: Linear.easeNone }, 0 );

        if ( type === 'confirm' ) {

            timeline.call( deleteToken, [ "Refresh" ], null, 0 );
            timeline.call( this.props.onClose, null, null, .3 );
            timeline.call( reloadWindow, null, null, .35 );

        } else {

            timeline.call( this.props.onClose, null, null, .3 );

        }

    }

    render() {

        return (

            <div className="logout_prompt">

                <div className="logout_text">
                    <h4>Logout</h4>
                </div>

                <div id="confirm_logout" className="logout_option" onClick={ ( e ) => this.handleClick( e, 'confirm' ) } />
                <div id="cancel_logout"  className="logout_option" onClick={ ( e ) => this.handleClick( e, 'cancel'  ) } />

            </div>

        )

    }

}


// Helpers

    function reloadWindow() {

        // window.location.replace( "https://destinytransmat.com" );
        window.location.replace( "https://jtsdev.github.io/transmat-react" );

    }

    function getFocusSiblings( item, allItems ) {

        let siblings = [];

        for ( let i = 0; i < allItems.length; i++ ) {

            const testItem = allItems[ i ];

            if ( testItem.characterIndex === item.characterIndex &&
                 testItem.inventory.bucketTypeHash === item.inventory.bucketTypeHash ) {


                siblings.push( testItem );

            }

        }

        return siblings;

    }


export default OverlaysBar_Comp