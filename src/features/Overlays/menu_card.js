
import React              from 'react'
import { _factionDefs }   from '../../helpers/factionDefs'
import { _milestoneDefs } from '../../helpers/milestoneDefs'
import Slot               from '../../containers/Slot'


class MenuCard extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            display: 'summary'
        };

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

        const displayType = this.state.display;

        if ( displayType === 'summary' ) {

            this.setState({
                display: 'expanded'
            });

        } else {

            this.setState({
                display: 'summary'
            });

        }

    }

    render() {

        const title   = this.props.title;
        const payload = menuCardRouter( title, this.props, this.state.display );

        return (

            <div className={ this.state.display === "summary" ? "menu_card_wrap" : "menu_card_wrap expanded" } onClick={ ( e ) => this.handleClick( e ) }>

                <div className="menu_card_header">
                    <p>{ title }</p>
                </div>
                {
                    payload
                }
            </div>

        )

    }

}


function menuCardRouter( title, props, displayState ) {

    switch ( title ) {

        // Progress
            case 'Milestones':
                return buildMilestonesCard( displayState, props.milestones );

            case 'Raids':
                return buildRaidCard( displayState, props.raid );

            case 'Reputations':
                return buildRepCard( props.factions, props.repItems, displayState );


        // Loadouts
            case 'Equip':
                return buildEquipCard( displayState );

            case 'Create':
                return buildCreateCard( displayState );


        // Tower
            case 'Engrams':
                return buildEngramsCard( displayState, props.engramItems );

            case 'Postmaster':
                return buildPostmasterCard( displayState, props.postmasterItems );

            case 'Vault':
                return buildVaultCard( displayState, props.vaultItems );


        default:
            return buildMenuCard();

    }

}


function buildMenuCard() {

    return <div className="menu_card"/>

}


// Progress
    function buildMilestonesCard( displayState, milestones ) {

        let payload = [];

        Object.keys( milestones ).forEach( function( hash ) {

            const thisMilestone = milestones[ hash ];
            thisMilestone.def   = {
                ..._milestoneDefs[ hash ]
            };

            switch ( parseInt( hash ) ) {

                case 463010297:
                    payload.push( <Milestone item={ thisMilestone } type="flashpoint" key="flashpoint" /> );
                    break;

                case 3660836525:
                    payload.push( <Milestone item={ thisMilestone } type="leviathan" key="leviathan" /> );
                    break;

                case 2171429505:
                    payload.push( <Milestone item={ thisMilestone } type="nightfall" key="nightfall" /> );
                    break;

                case 202035466:
                    payload.push( <Milestone item={ thisMilestone } type="callToArms" key="callToArms" /> );
                    break;

                case 3603098564:
                    payload.push( <Milestone item={ thisMilestone } type="clanXP" key="clanXP" /> );
                    break;

                case 2311040624:
                    payload.push( <Milestone item={ thisMilestone } type="trials" key="trials" /> );
                    break;

                case 4248276869:
                    payload.push( <Milestone item={ thisMilestone } type="ib_season" key="ib_seaseon" /> );
                    break;

                case 449068913:
                    payload.push( <Milestone item={ thisMilestone } type="ib_daily" key="ib_daily" /> );
                    break;

                default:
                    // console.log('no match');
                    // console.log(thisMilestone.milestoneHash);
                    break;

            }

        });


        if ( displayState === 'summary' ) {

            return  <div className="menu_card">

                <MilestonesSummary milestones={ payload } />

            </div>

        }

        return  <div className="menu_card">

                </div>

    }

    function buildRaidCard( displayState, raid ) {


        raid.def   = {
            ..._milestoneDefs[ raid.milestoneHash ]
        };


        let activityHash = raid.availableQuests[ 0 ].activity.activityHash;

        let encounterOrder = [ 'Baths', 'Gardens', 'Gauntlet', 'Throne' ];

        switch ( activityHash ) {

            case 2693136600:
                // GUESS AS DEFAULT
                encounterOrder = [ 'Baths', 'Gauntlet', 'Gardens', 'Throne' ];
                // console.log(2693136600);
                break;

            case 2693136601:
                encounterOrder = [ 'Baths', 'Gardens', 'Gauntlet', 'Throne' ];
                // GUESS ^
                // console.log(2693136601);
                break;

            case 2693136602:
                // Garden, Gauntlet, Baths, Calus ?
                encounterOrder = [ 'Gardens', 'Gauntlet', 'Baths', 'Throne' ];
                // console.log(2693136602);
                break;

            case 2693136603:
                // Garden, Baths, Gauntlet, Calus
                encounterOrder = [ 'Gardens', 'Baths', 'Gauntlet', 'Throne' ];
                // console.log(2693136603);
                break;

            case 2693136604:
                encounterOrder = [ 'Gauntlet', 'Gardens', 'Baths', 'Throne' ];
                // GUESS ^
                // console.log(2693136604);
                break;

            case 2693136605:
                encounterOrder = [ 'Gauntlet', 'Baths', 'Gardens', 'Throne' ];
                // GUESS ^
                // console.log(2693136605);
                break;

            default:
                // console.log('new raid hash');

        }

        if ( displayState === 'summary' ) {

            return  <div className="menu_card">

                <RaidSummary raid={ raid.availableQuests[ 0 ] } encounters={ encounterOrder } />

            </div>

        }

        return  <div className="menu_card">

        </div>

    }

    function buildRepCard( factions, repItems, displayState ) {

        return <div className="menu_card">

                    {
                        factions[ 1761642340 ] ?
                            <FactionTab faction={ factions[ 1761642340 ] } items={ repItems.ib } /> : null
                    }
                    {
                        factions[ 1714509342 ] ?
                            <FactionTab faction={ factions[ 1714509342 ] } items={ repItems.fwc } /> : null
                    }
                    {
                        factions[ 2105209711 ] ?
                            <FactionTab faction={ factions[ 2105209711 ] } items={ repItems.nm } /> : null
                    }
                    {
                        factions[ 3398051042 ] ?
                            <FactionTab faction={ factions[ 3398051042 ] } items={ repItems.do } /> : null
                    }

                    <FactionTab faction={ factions[ 24856709   ] } items={ repItems.raid } />
                    <FactionTab faction={ factions[ 469305170  ] } items={ repItems.nine } />
                    <FactionTab faction={ factions[ 1021210278 ] } items={ repItems.gunsmith } />
                    <FactionTab faction={ factions[ 697030790  ] } items={ repItems.crucible } />
                    <FactionTab faction={ factions[ 611314723  ] } items={ repItems.vanguardTactical } />
                    <FactionTab faction={ factions[ 3231773039 ] } items={ repItems.vanguardResearch } />
                    <FactionTab faction={ factions[ 4235119312 ] } items={ repItems.edz } />
                    <FactionTab faction={ factions[ 4196149087 ] } items={ repItems.titan } />
                    <FactionTab faction={ factions[ 1660497607 ] } items={ repItems.nessus } />
                    <FactionTab faction={ factions[ 828982195  ] } items={ repItems.io } />
                </div>

    }



// Loadouts
    function buildEquipCard( displayState ) {

        if ( displayState === 'summary' ) {

            return  <div className="menu_card">

                        <EquipSummary />

                    </div>

        }

        return  <div className="menu_card">

                </div>

    }

    function buildCreateCard( displayState ) {

        if ( displayState === 'summary' ) {

            return  <div className="menu_card">

                <CreateSummary />

            </div>

        }

        return  <div className="menu_card">

        </div>

    }


// Tower
    function buildEngramsCard( displayState, items ) {

        let slotIcons = [];

        for ( let i = 0; i < 10; i++ ) {

            if ( items[ i ] ) {

                slotIcons.push( <div className="engram_icon" style={{ backgroundImage: 'url(https://bungie.net' + items[ i ].displayProperties.icon + ')' }} key={ i } /> );

            } else {

                slotIcons.push( <div className="empty_engram_icon" key={ i } /> );

            }

        }

            return  <div className="menu_card">

                        <EngramsSummary slotIcons={ slotIcons } />

                    </div>;

    }

    function buildPostmasterCard( displayState, items ) {

            return  <div className="menu_card">

                        <PostmasterSummary items={ items } />

                    </div>;


    }

    function buildVaultCard( displayState, items ) {

        if ( displayState === 'summary' ) {

            return  <div className="menu_card">

                <VaultSummary items={ items } />

            </div>

        }

        return  <div className="menu_card">

                    {/*<VaultSummary />*/}

                </div>

    }



//  Progress

    //  Milestones
        class MilestonesSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                return (

                    <div className="milestones_summary">

                        {
                            this.props.milestones
                        }

                    </div>

                )

            }

        }

        class Milestone extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                const item  = this.props.item;
                const type  = this.props.type;

                let shouldShow = true,
                    progressNum,
                    progress,
                    subhash,
                    subStone;

                let display = item.def.displayProperties ? item.def.displayProperties : false;
                const status  = item.availableQuests[ 0 ].status;

                if ( status.redeemed ) { shouldShow = false }
                else {

                    switch ( type ) {

                        case 'flashpoint':
                            subhash     = item.availableQuests[ 0 ].questItemHash;
                            subStone    = item.def.quests[subhash];
                            display     = subStone.displayProperties;
                            progressNum = status.stepObjectives[ 0 ].progress;
                            progress    = Math.round( ( progressNum / 100 ) * 100 ) + '%';
                            break;

                        case 'leviathan':
                            subhash  = item.availableQuests[ 0 ].questItemHash;
                            subStone = item.def.quests[subhash];
                            display  = subStone.displayProperties;
                            break;

                        case 'nightfall':
                            display = item.def.displayProperties;
                            break;

                        case 'callToArms':

                            display     = item.def.displayProperties;
                            progressNum = status.stepObjectives[ 0 ].progress;
                            progress    = Math.round( ( progressNum / 150 ) * 100 ) + '%';
                            break;

                        case 'clanXP':
                            display = item.def.displayProperties;
                            if ( status.completed && !status.redeemed ) {

                                progress = '100%'

                            } else if ( !status.completed ) {

                                progressNum = status.stepObjectives[ 0 ].progress;
                                progress    = Math.round( ( progressNum / 20 ) * 100 ) + '%';

                            }
                            break;

                        case 'trials':
                            display = item.def.displayProperties;
                            break;

                        case 'ib_season':
                            display = item.def.displayProperties;
                            break;

                        case 'ib_daily':
                            display = item.def.displayProperties;
                            break;

                        default:
                            // console.log( 'Unknown Type' );


                    }

                }


                return (


                    <div className= { shouldShow ? "milestone" : "milestone hidden" }>

                        <div className="milestone_header">
                            <div className="milestone_header_left">
                                <div className="milestone_icon" style={{ backgroundImage: display ? 'url(https://bungie.net' + display.icon + ')' : ''  }} />
                                <p className="milestone_progress">{ progress }</p>
                            </div>
                            <div className="milestone_header_right">
                                <p className="milestone_name">{ display ? display.name : 'Default' }</p>
                                <div className="milestone_reward_icon"></div>
                            </div>
                        </div>
                        <div className="milestone_footer">
                            <div className="milestone_description" />
                            <div className="milestone_reward_name" />
                        </div>

                    </div>

                )

            }

        }


    //  Raid
        class RaidSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                const raid       = this.props.raid,
                      encounters = this.props.encounters;

                const activityHash = raid.activity.activityHash,
                      variants     = raid.activity.variants;

                const normalProgress   = variants[ 0 ].activityHash === activityHash ? variants[ 0 ] : variants[ 1 ];
                const prestigeProgress = variants[ 0 ].activityHash !== activityHash ? variants[ 0 ] : variants[ 1 ];

                const normal   = normalProgress.completionStatus.phases;
                const prestige = prestigeProgress.completionStatus.phases;

                if ( raid.status.completed ) {
                    normal[ 0 ].complete = true;
                    normal[ 1 ].complete = true;
                    normal[ 2 ].complete = true;
                    normal[ 3 ].complete = true;
                }


                return (

                    <div className="raid_summary">

                        <div className="raid_headers">
                            <p className="raid_name_text">{ "Leviathan" }</p>
                            <p className="raid_difficulty_text">Normal</p>
                            <p className="raid_difficulty_text">Prestige</p>
                        </div>

                        <div className="raid_progress_summary">
                            <div className="encounters_summary">
                                <div className="encounter">
                                    <div className="encounter_name"><p className="encounter_name_text">{ encounters[ 0 ] }</p></div>
                                    <div className="completion_block">
                                        <div className={ normal[ 0 ].complete ? "completion_fill top filled" : "completion_fill top" }></div>
                                    </div>
                                    <div className="completion_block">
                                        <div className={ prestige[ 0 ].complete ? "completion_fill filled" : "completion_fill" }></div>
                                    </div>
                                </div>
                                <div className="encounter">
                                    <div className="encounter_name"><p className="encounter_name_text">{ encounters[ 1 ] }</p></div>
                                    <div className="completion_block">
                                        <div className={ normal[ 1 ].complete ? "completion_fill top filled" : "completion_fill top" }></div>
                                    </div>
                                    <div className="completion_block">
                                        <div className={ prestige[ 1 ].complete ? "completion_fill filled" : "completion_fill" }></div>
                                    </div>
                                </div>
                                <div className="encounter">
                                    <div className="encounter_name"><p className="encounter_name_text">{ encounters[ 2 ] }</p></div>
                                    <div className="completion_block">
                                        <div className={ normal[ 2 ].complete ? "completion_fill top filled" : "completion_fill top" }></div>
                                    </div>
                                    <div className="completion_block">
                                        <div className={ prestige[ 2 ].complete ? "completion_fill filled" : "completion_fill" }></div>
                                    </div>
                                </div>
                                <div className="encounter">
                                    <div className="encounter_name"><p className="encounter_name_text">{ encounters[ 3 ] }</p></div>
                                    <div className="completion_block">
                                        <div className={ normal[ 3 ].complete ? "completion_fill top filled" : "completion_fill top" }></div>
                                    </div>
                                    <div className="completion_block">
                                        <div className={ prestige[ 3 ].complete ? "completion_fill filled" : "completion_fill" }></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                )

            }

        }


    //  Reputations
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

                const items   = this.props.items,
                      faction = this.props.faction;

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

        class FactionSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                const faction = this.props.faction;

                // Def
                    const factionDef = _factionDefs[ faction.factionHash ];

                // Icon
                    const url  = 'url(https://bungie.net' + factionDef.displayProperties.icon + ')';

                return (

                    <div className="faction_icon summary" style={{ backgroundImage: url }} />

                )

            }

        }

        function buildCurrentTokens( items ) {

            let payload = [];

            for ( let i = 0; i < items.length; i++ ) {

                const item = items[ i ];

                let url = 'url(https://bungie.net' + item.icon + ')';

                let tokenIcon =
                    <div className="rep_token_icon" style={{ backgroundImage: url }} key={ item.name }>
                        <div className="rep_token_counter">{ item.quantity }</div>
                    </div>;

                payload.push( tokenIcon );

            }

            return payload;

        }



//  Loadouts

    //  Equip
        class EquipSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                return (

                    <div className="equip_summary">

                    </div>

                )

            }

        }


    //  Create
        class CreateSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                return (

                    <div className="create_summary">

                    </div>

                )

            }

        }



//  Tower

    //  Engrams
        class EngramsSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                return (

                    <div className="engrams_summary">
                        <div className="engrams_container">
                            {
                                this.props.slotIcons
                            }
                        </div>
                    </div>

                )

            }

        }


    //  Postmaster
        class PostmasterSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                const items = this.props.items;

                let slots = [];

                for ( let i = 0; i < items.length; i++ ) {

                    slots.push(
                        <Slot slotType={ 'postmaster_slot' } item={ items[ i ] } side={ 'postmaster'  } pos={ i } key={ i } />
                    )

                }

                return (

                    <div className="postmaster_summary">

                        <div className="postmaster_bucket">
                            {
                                slots
                            }
                        </div>

                    </div>

                )

            }

        }


    //  Vault
        class VaultSummary extends React.Component {

            constructor( props ) {

                super( props );

                this.state ={
                   active: 'none'
                };

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e, type ) {

                e.stopPropagation();

                this.setState({
                    active: type
                });

            }

            render() {

                return (

                    <div className="vault_summary">

                        <div className="vault_button_container">
                            <div className="vault_button misc"    onClick={ ( e ) => this.handleClick( e, 'Misc.'    ) }><p>Misc.</p></div>
                            <div className="vault_button armor"   onClick={ ( e ) => this.handleClick( e, 'Armor'    ) }><p>Armor</p></div>
                            <div className="vault_button weapons" onClick={ ( e ) => this.handleClick( e, 'Weapons'  ) }><p>Weapons</p></div>
                        </div>

                        {
                            this.state.active === 'Weapons' ?
                                <VaultBucket type={ 'Weapons' } items={ this.props.items } /> : null
                        }
                        {
                            this.state.active === 'Armor' ?
                                <VaultBucket type={ 'Armor' } items={ this.props.items } /> : null
                        }
                        {
                            this.state.active === 'Misc.' ?
                                <VaultBucket type={ 'Misc.' } items={ this.props.items } /> : null
                        }

                    </div>

                )

            }

        }

        class VaultBucket extends React.Component {

            constructor( props ) {

                super( props );

                this.handleClick = this.handleClick.bind( this );

            }

            handleClick( e ) {

                e.stopPropagation();

            }

            render() {

                const type  = this.props.type,
                      items = this.props.items;

                let bucketItems = [];

                for ( let i = 0; i < items.length; i++ ) {

                    const item = items[ i ];

                    if ( item.itemType === 3 && type === 'Weapons' ) {

                        bucketItems.push( item );

                    } else if ( item.itemType === 2 && type === 'Armor' ) {

                        bucketItems.push( item );

                    } else if ( item.itemType !== 2 && item.itemType !== 3 && type === 'Misc.' ) {

                        if ( item.bucketHash !== item.inventory.bucketTypeHash ) {

                            bucketItems.push( item );

                        }

                    }

                }

                let count = 0;

                for ( let i = 0; i < items.length; i++ ) {

                    const item = items[ i ];

                    if ( item.bucketHash === item.inventory.bucketTypeHash ) {

                        count++;

                    }

                }


                let slots = [];

                for ( let i = 0; i < bucketItems.length; i++ ) {

                    slots.push( <Slot slotType={ 'vault_bucket_slot' } item={ bucketItems[ i ] } side={ 'vault'  } pos={ i } key={ i } />)

                }

                return (

                    <div className="vault_bucket">
                        <div className="vault_headers">
                            <p className="vault_bucket_text">{ this.props.type }</p>
                            <p className="vault_space_text">{ count + " / 200" }</p>
                        </div>
                        {
                            slots
                        }
                    </div>

                )

            }

        }




export default MenuCard