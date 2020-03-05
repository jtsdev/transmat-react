
import { connect }           from 'react-redux'
import { handleStoredClick } from '../../actions'
import StoredBar_Comp        from './stored_bar'


const mapStateToProps = state => {

    return {
        typeFocus:     state.gearBar,
        interfaceType: state.mainInterface,
        switcher:      state.switcher,
        storedFocus:   state.storedFocus
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onStoredClick: ( invType ) => {

            dispatch( handleStoredClick( invType ) )

        }

    }

};


const StoredBar = connect(

    mapStateToProps,
    mapDispatchToProps

)( StoredBar_Comp );


export default StoredBar