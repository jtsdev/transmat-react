
import { connect }               from 'react-redux'
import { handleInventoryClick,
         backgroundClick       } from '../../actions'
import InventoryBar_Comp         from './inventory_bar'


const mapStateToProps = state => {

    return {
        typeFocus:     state.gearBar,
        interfaceType: state.mainInterface,
        switcher:      state.switcher,
        loginStatus:   state.loginStatus
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onInventoryClick: ( invType ) => {

            dispatch( handleInventoryClick( invType ) )

        },

        onInventoryFocusClick: () => {

            dispatch( backgroundClick() )

        }

    }

};


const InventoryBar = connect(

    mapStateToProps,
    mapDispatchToProps

)( InventoryBar_Comp );


export default InventoryBar