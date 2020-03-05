import React  from 'react'


class StatelessComp extends React.Component {

    constructor( props ) {

        super( props );

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

    }

    render() {

        const item  = this.props.item;

        const stats = item.instanceStats,
              type  = item.itemType,
              name  = item.itemTypeDisplayName;

        let isWeapon = true,
            isSword  = false,
            hasStats = true,
            stat_props,
            stat_names;

        if ( name === 'Vehicle' || name === 'Hunter Cloak' || name === 'Titan Mark' || name === 'Warlock Bond' ) {

            hasStats = false;

        } else if ( type === 2 ) {  // Armor

            stat_props = [
                convertArmorStat( stats[ 2996146975 ].value ) + '%', // Mobility
                convertArmorStat( stats[ 392767087  ].value ) + '%', // Resilience
                convertArmorStat( stats[ 1943323491 ].value ) + '%'  // Recovery
            ];

            stat_names = [ 'Mobility', 'Resilience', 'Recovery' ];

            isWeapon = false;

        } else if ( name === 'Rocket Launcher' || name === 'Grenade Launcher' ) {

            stat_props = [
                            stats[ 3614673599 ].value + '%', // Blast Radius
                            stats[ 2523465841 ].value + '%', // Velocity
                            stats[ 155624089  ].value + '%', // Stability
                            stats[ 943549884  ].value + '%', // Handling
                            stats[ 4188031367 ].value + '%', // Reload Speed
                            stats[ 4284893193 ].value,       // Rounds Per Minute
                            stats[ 3871231066 ].value        // Magazine
            ];

            stat_names = [ 'Blast Radius', 'Velocity', 'Stability', 'Handling', 'Reload Speed', 'RPM', 'Magazine' ];

        } else if ( name === 'Sword' ) {

            stat_props = [
                            stats[ 2837207746 ].value + '%', // Swing Speed
                            stats[ 4043523819 ].value + '%', // Impact
                            stats[ 1240592695 ].value + '%', // Range
                            stats[ 2762071195 ].value + '%', // Efficiency
                            stats[ 209426660  ].value + '%', // Defense
                            stats[ 925767036  ].value        // Ammo Capacity
            ];

            stat_names = [ 'Swing Speed', 'Impact', 'Range', 'Efficiency', 'Defense', 'Ammo Capacity' ];

            isSword = true;

        } else if ( name === 'Fusion Rifle' || name === 'Linear Fusion Rifle' ) {

            stat_props = [
                            stats[ 4043523819 ].value + '%', // Impact
                            stats[ 1240592695 ].value + '%', // Range
                            stats[ 943549884  ].value + '%', // Handling
                            stats[ 155624089  ].value + '%', // Stability
                            stats[ 4188031367 ].value + '%', // Reload Speed
                            stats[ 2961396640 ].value,       // Charge Time
                            stats[ 3871231066 ].value        // Magazine
            ];

            stat_names = [ 'Impact', 'Range', 'Handling', 'Stability', 'Reload Speed', 'Charge Time', 'Magazine' ];

        } else {

            stat_props = [
                            stats[ 4043523819 ].value + '%', // Impact
                            stats[ 1240592695 ].value + '%', // Range
                            stats[ 155624089  ].value + '%', // Stability
                            stats[ 943549884  ].value + '%', // Handling
                            stats[ 4188031367 ].value + '%', // Reload Speed
                            stats[ 4284893193 ].value,       // Rounds Per Minute
                            stats[ 3871231066 ].value        // Magazine
            ];

            stat_names = [ 'Impact', 'Range', 'Stability', 'Handling', 'Reload Speed', 'RPM', 'Magazine' ];

        }

        return (

            <div className="item_stat_bars">
                {
                    hasStats ?
                        <div className="stat_wrap">
                            <div id="stat_row_1" className="stat_row">

                                <div className="stat_name">
                                    <p>{ stat_names[ 0 ] }</p>
                                </div>
                                <div className="item_stat_bar">
                                    <div className="item_stat_bar_fill" style={ { width: stat_props[ 0 ] } }></div>
                                </div>

                            </div>
                            <div id="stat_row_2" className="stat_row">

                                <div className="stat_name">
                                    <p>{ stat_names[ 1 ] }</p>
                                </div>
                                <div className="item_stat_bar">
                                    <div className="item_stat_bar_fill" style={ { width: stat_props[ 1 ] } }></div>
                                </div>

                            </div>
                            <div id="stat_row_3" className="stat_row">

                                <div className="stat_name">
                                    <p>{ stat_names[ 2 ] }</p>
                                </div>
                                <div className="item_stat_bar">
                                    <div className="item_stat_bar_fill" style={ { width: stat_props[ 2 ] } }></div>
                                </div>

                            </div>
                            {
                                isWeapon ?
                                    <div id="stat_row_4" className="stat_row">

                                        <div className="stat_name">
                                            <p>{ stat_names[ 3 ] }</p>
                                        </div>
                                        <div className="item_stat_bar">
                                            <div className="item_stat_bar_fill" style={ { width: stat_props[ 3 ] } }></div>
                                        </div>

                                    </div> : null
                            }
                            {
                                isWeapon ?
                                    <div id="stat_row_5" className="stat_row">

                                        <div className="stat_name">
                                            <p>{ stat_names[ 4 ] }</p>
                                        </div>
                                        <div className="item_stat_bar">
                                            <div className="item_stat_bar_fill" style={ { width: stat_props[ 4 ] } }></div>
                                        </div>

                                    </div> : null
                            }
                            {
                                isWeapon ?
                                    <div id="stat_row_6" className="stat_row">

                                        <div className="stat_name">
                                            <p>{ stat_names[ 5 ] }</p>
                                        </div>
                                        <div className="item_stat_text_bar">
                                            <p>{ stat_props[ 5 ] }</p>
                                        </div>

                                    </div> : null
                            }
                            {
                                isWeapon && !isSword ?
                                    <div id="stat_row_7" className="stat_row">

                                        <div className="stat_name">
                                            <p>{ stat_names[ 6 ] }</p>
                                        </div>
                                        <div className="item_stat_text_bar">
                                            <p>{ stat_props[ 6 ] }</p>
                                        </div>

                                    </div> : null
                            }
                        </div> : null
                }
            </div>

        )

    }

}


// Helpers

    function convertArmorStat( value ) {

        switch ( value ) {

            case 0:     return 0;
            case 1:     return 33;
            case 2:     return 66;
            case 3:     return 100;

            default:
                return 0;

        }

    }


export default StatelessComp