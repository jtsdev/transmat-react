
import React            from 'react'
import { TweenMax,
         Power2,
         Linear,
         TimelineLite,
         TimelineMax   }    from "gsap";


class AboutOverlay extends React.Component {

    constructor( props ) {

        super( props );

        this.state = {};

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        const overlay = document.querySelector( '.overlay' );
        TweenMax.to( overlay, .25, { css: { scaleY: 1 }, ease: Power2.easeOut } );

    }

    handleClick( e ) {

        e.stopPropagation();

    }

    render() {

        return (

            <div id="about_overlay" className="overlay">

                <h4>About</h4>
                <button className="overlay_close" onClick={ ( e ) => this.props.onClose( e ) }></button>

            </div>

        )

    }

}


export default AboutOverlay