
import { connect }               from 'react-redux'
import { handleItemClick,
         handleScannerClick    } from '../../actions'
import ScannerBar_Comp           from './scanner_bar'


const mapStateToProps = state => {

    return {
        typeFocus:     state.gearBar,
        interfaceType: state.mainInterface,
        switcher:      state.switcher,
        targetIndex:   state.scannerTarget,
        scannerType:   state.scanner,
        focusItem:     state.focusItem
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onItemClick: ( slotIndex ) => {

            dispatch( handleItemClick( slotIndex ) )

        },

        onScannerClick: ( toState ) => {

            dispatch( handleScannerClick( toState ) )

        },

    }

};


const ScannerBar = connect(

    mapStateToProps,
    mapDispatchToProps

)( ScannerBar_Comp );


export default ScannerBar