

import React from 'react'
import Slot  from '../../containers/Slot'


class ScannerBar_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( source ) {

    }

    render() {

        const targetIndex = this.props.targetIndex;

        const doScan = targetIndex.includes( 'bottom' ) || targetIndex.includes( 'vault' );

        let slotClone;

        if ( doScan ) { slotClone = createSlotClone( this.props.targetIndex, this.handleClick, this.props.focusItem ); }
        
        return (

            <div className="scanner">

                <svg id="beamSVG" className="beamSVG">
                    <defs>
                        <filter id="red-glow" filterUnits="userSpaceOnUse"
                            x="-50%" y="-50%" width="200%" height="200%">
     
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur5"/>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur10"/>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur20"/>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur30"/>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="50" result="blur50"/>
     
                            <feMerge result="blur-merged">
                                <feMergeNode in="blur10"/>
                                <feMergeNode in="blur20"/>
                                <feMergeNode in="blur30"/>
                                <feMergeNode in="blur50"/>
                            </feMerge>
  
                            <feColorMatrix result="red-blur" in="blur-merged" type="matrix"
                                values="0.31     0     0     0     0
                                        0     0.92     0     0     0
                                        0     0     0.96     0     0
                                        0     0     0     1     0 "/>
                            <feMerge>
                                <feMergeNode in="red-blur"/>       
                                <feMergeNode in="blur5"/>          
                                <feMergeNode in="SourceGraphic"/> 
                            </feMerge>
                        </filter>
                        <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="50%" y2="100%" > 
                            <stop offset="0%" stopColor="#01e1ff">
                                <animate attributeName="stop-color" values="#01e1ff; #016fff; #01e1ff" dur="1s" repeatCount="indefinite"></animate>
                            </stop>

                            <stop offset="100%" stopColor="#016fff">
                                <animate attributeName="stop-color" values="#016fff; #01e1ff; #016fff" dur="1s" repeatCount="indefinite"></animate>
                            </stop>
                        </linearGradient>
                    </defs>
                    {/* #0195ff */}
                    <path id="beamPathEl" d="M376 456" fill="url('#logo-gradient')" /> 
                    <path id="beamPathElLeft" d="M376 456" fill="url('#logo-gradient')" /> 
                    <path id="beamPathElRight" d="M376 456" fill="url('#logo-gradient')" /> 
                    <line id="beamRay0" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay1" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay2" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay3" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay4" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay5" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay6" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay7" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />

                    <line id="beamRay8" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay9" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay10" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay11" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay12" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay13" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay14" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay15" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />

                    <line id="beamRay16" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay17" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay18" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay19" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay20" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay21" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay22" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                    <line id="beamRay23" className="beamRay" x1="50%" y1="50%" x2="50%" y2="50%" />
                </svg>

                <div className="beamTarget" id="beamTarget0" />
                <div className="beamTarget" id="beamTarget1" />
                <div className="beamTarget" id="beamTarget2" />
                <div className="beamTarget" id="beamTarget3" />
                <div className="beamTarget" id="beamTarget4" />
                <div className="beamTargetFull" id="beamTarget4" />
                <div className="beamTargetFullLeft" id="beamTarget5" />

                <div className="scanner_bar">

                    <Slot slotType="details_target" />
                        
                    <div className="type_focus_scanner">
                        <div className="scanner_focus_header" style={{ opacity: 0 }} >
                            <h5 className={ 'header_left' }>{ "Spacer" }</h5>
                        </div>
                        <div id="scan_focus_target" className="scan_focus_target" />
                        <div className="scan_beam_thin_target" />
                        <div className="scanner_bucket"></div>
                    </div>

                </div>
                <div className="scanner_bar_right">
                    <div className="type_focus_scanner_right">
                        <div className="scanner_focus_header_right" style={{ opacity: 0 }} >
                            {/* <h5 className={ 'header_right' }>{ "Spacer" }</h5> */}
                        </div>
                        <div className="scanner_bucket_right"></div>
                        <div className="scan_beam_thin_target_right" />
                        <div id="scan_focus_target_right" className="scan_focus_target_right" />
                    </div>
                </div>
                < div className="scanner_bar_launch">
                    <div className="scanner_interface">
                        <div className="scanner_char_back" id="scanner_char_back_m"></div>
                        <div className="scanner_char_back_left">
                            <div className="scanner_emblem_bar">
                                <div className="scanner_emblem_container_left">
                                    <div className="scanner_emblem_left"></div>
                                </div>
                            </div>
                        </div>
                        <div className="scanner_char_back_right">
                        <div className="scanner_emblem_bar">
                                <div className="scanner_emblem_container_right">
                                    <div className="scanner_emblem_right"></div>
                                </div>
                            </div>
                        </div>
                        <div className="scanner_char_back_left_up"></div>
                        <div className="scanner_char_back_right_up"></div>
                        <div className="scanner_emblem_bar">
                            <div className="scanner_emblem_container">
                                <div className="scanner_emblem"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scanner_bar_launch_left"></div>
                <div className="scanner_bar_launch_right"></div>
                <div className="scanner_lower_wrap">
                    <div className="scanner_main_bar">
                        <div className="scanner_loadout">
                            <div className="scanner_gear_bar_left">
                                <div className="height_adjustor">
                                    <div className="left_adjustor">
                                        <div className="scanner_subclass"/>
                                        <div className="scanner_left_slots">
                                            <div className="scanner_left_slots_thin"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="height_adjustor">
                                    <div>
                                        <div className="scanner_subclass"/>
                                        <div className="scanner_left_slots_back">
                                        <div className="scanner_left_slots_back_thin"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="scanner_gear_bar_right">
                                <div className="height_adjustor">
                                    <div className="gear_bar_spacer"/>
                                    <div className="scanner_right_slots">
                                        <div className="scanner_right_slots_thin"/>
                                    </div>
                                </div>
                                <div className="height_adjustor">
                                    <div className="gear_bar_spacer"/>
                                    <div className="scanner_right_slots_back">
                                        <div className="scanner_right_slots_back_thin"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { doScan ? slotClone : null }

            </div>
        )

    }

}


// Helpers

    function createSlotClone( targetIndex, clickCall, item ) {

        const moveInfo = getMoveInfo( getTarget( targetIndex ) );

        return <Slot moveInfo={ moveInfo }
                     scanTarget={ targetIndex }
                     item={ item }
                     slotType={ 'slot item_details' }
                     side={ 'front'  }
                     pos={ 0 }
                     passControl={ clickCall }
                     clickCall={ ( e ) => clickCall( e, 'item_details' ) } />

    }

    function getMoveInfo( target ) {

        let infoObj = {};

        const data = target.getBoundingClientRect();

            infoObj.start = [ data.left, data.top ];
            infoObj.dims  = data.width;

        const dest    = getTarget( 'details_target' );
        const endData = dest.getBoundingClientRect();

            infoObj.end = [ endData.left + 5, endData.top + 5 ];

        return infoObj

    }

    function getTarget( index ) {

        return document.querySelector( '.' + index )

    }


export default ScannerBar_Comp