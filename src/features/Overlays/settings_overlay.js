

import React              from 'react'
import { TweenMax,
         Power2,
         Linear,
         TimelineLite,
         TimelineMax   }  from "gsap";
import { settings,
         putSetting }     from "../../index"


class SettingsOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            settings: settings
        };

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        const overlay = document.querySelector( '.overlay' );
        TweenMax.to( overlay, .25, { css: { scaleY: 1 }, ease: Linear.easeNone } );

    }

    handleClick() {

        this.setState({
            settings: settings
        });

    }

    render() {

        let settingsArray = this.state.settings;

        let payload = [];


        for ( let i = 0; i < settingsArray.length; i++ ) {

            const setting = settingsArray[ i ];
            let isVis     = true;

            // Sub-settings are hidden until their parent setting is active
                // Set sub-setting's vis = to parent's active state
                    if ( setting.isSub ) {

                        const parentActive = settingsArray[ setting.parent ].isActive;
                        if ( !parentActive ) { isVis = false }

                    }

            // Add setting if visible
            payload.push(
                <Setting name={ setting.name } isVis={ isVis } isActive={ setting.isActive } isSub={ setting.isSub } parent={ setting.parent } key={ setting.name } onUpdate={ this.handleClick } />
            )

        }

        return (

            <div id="settings_overlay" className="overlay">

                <h4>Settings</h4>
                <button className="overlay_close" onClick={ ( e ) => this.props.onClose( e ) }></button>

                <div className="setting_container">

                    {
                        payload
                    }

                </div>

            </div>

        )

    }

}


class Setting extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {
            active: this.props.isActive
        };

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {}

    handleClick( e ) {

        e.stopPropagation();

        putSetting( this.props.name, !this.state.active, this.props.isSub, this.props.parent );

        this.setState({
            active: !this.state.active
        });

        let func = this.props.onUpdate;
        setTimeout( function() {

            func();

        }, 250 );

    }

    render() {

        let baseClass = !this.props.isSub ? "setting" : "setting sub";

        return (

            <div className={ this.props.isVis ? baseClass : baseClass + " collapse" }>

                <div className="setting_name">
                    <p>{ this.props.name }</p>
                </div>
                {
                    this.state.active ?
                        <button className={ "setting_toggle filled" } onClick={ ( e ) => this.handleClick( e ) }></button>
                        :
                        <button className={ "setting_toggle" } onClick={ ( e ) => this.handleClick( e ) }></button>
                }

            </div>

        )

    }

}



export default SettingsOverlay