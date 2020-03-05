
import { connect }           from 'react-redux'
import { handleLoginClick,
         handleGhostClick  } from '../actions'
import Ghost_Comp            from '../components/ghost'


const mapStateToProps = state => {

    return {
        rings:         state.rings,
        interfaceType: state.mainInterface,
        focusType:     state.gearBar,
        ghost:         state.ghost,
        overlays:      state.overlays,
        itemsReady:    state.itemsReady
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onLoginClick: ()  => {

            dispatch( handleLoginClick() )

        },

        onGhostClick: ( rings, interfaceType ) => {

            dispatch( handleGhostClick( rings, interfaceType ) )

        }

    }

};


const Ghost = connect(

    mapStateToProps,
    mapDispatchToProps

)( Ghost_Comp );


export default Ghost
