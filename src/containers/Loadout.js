

import { connect }          from 'react-redux'
import Loadout_Comp         from '../components/loadout'


const mapStateToProps = state => {

    return {
        typeFocus:     state.gearBar,
        interfaceType: state.mainInterface,
        switcher:      state.switcher,
        focSide:       state.ghost,
        focSubclass:   state.focusSubclass
    }

};

const mapDispatchToProps = dispatch => {

    return {

        // onItemParse: ( subclasses )  => {
        //
        //     dispatch( setSubclasses( subclasses ) )
        //
        // }

    }

};


const Loadout = connect(

    mapStateToProps,
    mapDispatchToProps

)( Loadout_Comp );


export default Loadout