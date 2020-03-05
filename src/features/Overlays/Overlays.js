
import { connect }       from 'react-redux'
import { hideOverlays,
         updateToggle }  from '../../actions'
import OverlaysBar_Comp  from './overlays_bar.js'


const mapStateToProps = state => {

    return {
        showOverlays: state.overlays,
        charModels:   state.charModels,
        charFocus:    state.character,
        focusItem:    state.focusItem,
        ghost:        state.ghost,
        updateToggle: state.updateToggle
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onOverlaysClose: ( closeType )  => {

            dispatch( hideOverlays( closeType ) )

        },

        onUpdateToggle: ( oldState ) => {

            dispatch( updateToggle( oldState ) )

        }

    }

};


const OverlayBar = connect(

    mapStateToProps,
    mapDispatchToProps

)( OverlaysBar_Comp );


export default OverlayBar