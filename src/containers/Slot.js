

import { connect }              from 'react-redux'
import { handleSlotClick,
         handleSubclassClick,
         handleSwitcher,
         handleItemClick,
         handleShowDetails,
         setSubclassFocus     } from '../actions'
import Slot_Comp                from '../components/slot'


const mapStateToProps = state => {

    return {

        focusSlot:     state.gearBar,
        interfaceType: state.mainInterface,
        scannerTarget: state.scannerTarget

    }

};

const mapDispatchToProps = dispatch => {

    return {

        onSlotClick: ( slot, pos )  => {

            dispatch( handleSlotClick( slot, pos ) )

        },

        onSubclassClick: ( interfaceType ) => {

            dispatch( handleSubclassClick( interfaceType ) )

        },

        onSwitcherClick: ( index ) => {

            dispatch( handleSwitcher( index ) )

        },

        onItemClick: ( slotType, item ) => {

            dispatch( handleItemClick( slotType, item ) )

        },

        onShowDetails: ( detailsType ) => {

            dispatch( handleShowDetails( detailsType ) )

        },

        unfocusedSubclassClick: ( subclass ) => {

            dispatch( setSubclassFocus( subclass ) )

        }

    }

};


const Slot = connect(

    mapStateToProps,
    mapDispatchToProps

)( Slot_Comp );


export default Slot