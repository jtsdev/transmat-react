
import React            from 'react'
import MenuCard         from './menu_card'
import { _factionDefs } from '../../helpers/factionDefs'

// import Slot      from '../../containers/Slot'


class ProgressOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        setTimeout( function() {

            document.querySelector( '.progress_overlay_bar' ).style.transform = 'scale(1)';
            document.querySelector( '.progress_overlay_bar' ).style.opacity   = 1;

        }, 250 );

    }

    handleClick( e, route ) {

    }

    render() {

        const char       = this.props.charFocus;
        const factions   = char.progress.factions,
              milestones = char.progress.milestones;

        const repItems = buildReputationItems( this.props.repItems.factions );

        return (

            <div className="progress_overlay_bar">

                <div className="progress_overlay">

                    <MenuCard title={ 'Milestones' }  char={ char } milestones={ milestones } />
                    <MenuCard title={ 'Raids' }       char={ char } raid={ milestones[ 3660836525 ] } />
                    <MenuCard title={ 'Reputations' } char={ char } factions={ factions } repItems={ repItems } />

                </div>

            </div>

        )

    }

}


class FactionTab extends React.Component {

    constructor( props ) {

        super( props );

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

        let openTab = document.querySelector( '.faction_tab.open' );

        if ( openTab === e.target ) {

            openTab.classList.remove( 'open' );

        } else if ( openTab ) {

            openTab.classList.remove( 'open' );
            e.target.classList.add( 'open' );

        } else {

            e.target.classList.add( 'open' );

        }

    }

    render() {

        const items   = this.props.items;
        const faction = this.props.faction;

        // console.log('-factionTab items-');
        // console.log(items);

        // Def
            const factionDef = _factionDefs[ faction.factionHash ];

        // Rep: Total, Progress
            let repPerLevel     = faction.nextLevelAt;
            let currentProgress = faction.progressToNextLevel;

        // Faction Name/Description/Icon
            const name = factionDef.displayProperties.name;
            const desc = factionDef.displayProperties.description;
            const url  = 'url(https://bungie.net' + factionDef.displayProperties.icon + ')';

        if ( currentProgress === repPerLevel ) {
            currentProgress = 0;
        }

        let percent = ( currentProgress / repPerLevel ) * 100;

        const currentTokens = buildCurrentTokens( items );

        // console.log('-factionTab currentTokens-');
        // console.log(currentTokens);

        return (

            <div className="faction_tab" onClick={ ( e ) => this.handleClick( e ) }>

                <div className="reputation_bar">

                    <div className="faction_icon" style={{ backgroundImage: url }} />

                        <div className="faction_details">
                            <div className="faction_name">
                                <p className="faction_name_text">{ name }</p>
                            </div>
                            <div className="progress_bar">
                                <div className="progress_bar_back" />
                                <div className="progress_bar_fill" style={{ width: percent + '%' }} />
                            </div>
                            <div className="progress_counter">
                                <p className="progress_counter_text">{ currentProgress + ' / ' + repPerLevel }</p>
                            </div>
                            <div className="token_bar_toggle"></div>
                        </div>

                </div>
                <div className="token_bar">

                    <div className="faction_description">
                        <p className="faction_description_text">{ desc }</p>
                    </div>
                    <div className="token_container">
                        { currentTokens }
                    </div>

                </div>

            </div>

        )

    }

}



function buildReputationItems( repItems ) {

    let repObj = {
        ib: [],
        fwc: [],
        nm: [],
        do: [],
        raid: [],
        nine: [],
        gunsmith: [],
        crucible: [],
        vanguardTactical: [],
        vanguardResearch: [],
        edz: [],
        titan: [],
        nessus: [],
        io: []
    };

    for ( let i = 0; i < repItems.length; i++ ) {

        const item = repItems[ i ];
        const name = item.displayProperties.name;
// console.log(item);
// console.log(name);
        switch ( name ) {

            // IB
                case 'Iron Banner Token':
                    repObj.ib.push( buildRepItem( item ) );                 break;

            // FWC
                case 'FWC Token':
                    repObj.fwc.push( buildRepItem( item ) );                break;

            // NM
                case 'New Monarchy Token':
                    repObj.nm.push( buildRepItem( item ) );                 break;

            // DO
                case 'Dead Orbit Token':
                    repObj.do.push( buildRepItem( item ) );                 break;

            // Raid
                case 'Emperor Calus Token':
                    repObj.raid.push( buildRepItem( item ) );               break;

            // Nine
                case 'Trials of the Nine Token':
                    repObj.nine.push( buildRepItem( item ) );               break;

            // Gunsmith
                case 'Gunsmith Materials':
                    repObj.gunsmith.push( buildRepItem( item ) );           break;
                case 'Weapon Telemetry':
                    repObj.gunsmith.push( buildRepItem( item ) );           break;

            // Crucible
                case 'Crucible Token':
                    repObj.crucible.push( buildRepItem( item ) );           break;

            // Vanguard Tactical
                case 'Vanguard Tactician Token':
                    repObj.vanguardTactical.push( buildRepItem( item ) );   break;

            // Vanguard Research
                case 'Vanguard Research Token':
                    repObj.vanguardResearch.push( buildRepItem( item ) );   break;

            // EDZ
                case 'EDZ Token':
                    repObj.edz.push( buildRepItem( item ) );                break;
                case 'Dusklight Shard':
                    repObj.edz.push( buildRepItem( item ) );                break;
                case 'Dusklight Crystal':
                    repObj.edz.push( buildRepItem( item ) );                break;

            // Titan
                case 'Arcology Token':
                    repObj.titan.push( buildRepItem( item ) );              break;
                case 'Alkane Dust':
                    repObj.titan.push( buildRepItem( item ) );              break;
                case 'Alkane Spores':
                    repObj.titan.push( buildRepItem( item ) );              break;

            // Nessus
                case 'Nessus Token':
                    repObj.nessus.push( buildRepItem( item ) );             break;
                case 'Microphasic Datalattice':
                    repObj.nessus.push( buildRepItem( item ) );             break;
                case 'Quantized Datalattice':
                    repObj.nessus.push( buildRepItem( item ) );             break;

            // Io
                case 'Io Token':
                    repObj.io.push( buildRepItem( item ) );                 break;
                case 'Phaseglass Needle':
                    repObj.io.push( buildRepItem( item ) );                 break;
                case 'Phaseglass Spire':
                    repObj.io.push( buildRepItem( item ) );                 break;

            default:
                // console.log('no match');
                break;

        }

    }

    // console.log('-repObj-');
    // console.log(repObj);

    return repObj;

}

function buildRepItem( item ) {

    const itemObj = {
        icon: item.displayProperties.icon,
        name: item.displayProperties.name,
        quantity: item.quantity
    };

    return itemObj;

}


function buildCurrentTokens( items ) {

    let payload = [];

    for ( let i = 0; i < items.length; i++ ) {

        const item = items[ i ];

        let url = 'url(https://bungie.net' + item.icon + ')';

        let tokenIcon =
            <div className="rep_token_icon" style={{ backgroundImage: url }}>
                <div className="rep_token_counter">{ item.quantity }</div>
            </div>;

        payload.push( tokenIcon );

    }

    // console.log('-payload-');
    // console.log(payload);

    return payload;

}


export default ProgressOverlay