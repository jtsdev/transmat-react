
import { connect }               from 'react-redux'
import { handleInventoryClick,
         interfaceLaunched,
         characterFocus,
         setCharacters } from '../actions'
        //  setSubclassFocus      } from '../actions'
import Interface_Comp            from '../components/interface'


const mapStateToProps = state => {

    return {

        inventoryButtons: true,
        typeFocus:        state.gearBar,
        interfaceType:    state.mainInterface,
        charFocus:        state.character,
        updateToggle:     state.updateToggle

    }

};

const mapDispatchToProps = dispatch => {

    return {

        onInventoryClick: ( invType )  => {

            dispatch( handleInventoryClick( invType ) )

        },

        onInventoryMount: ( characters ) => {

          dispatch( setCharacters( characters ) )

        },

        onInterfaceLaunched: () => {

          dispatch( interfaceLaunched() )

        },

        // onCharacterMount: ( subclass ) => {

        //   dispatch( setSubclassFocus( subclass ) )

        // },

        onChangeCharacter: ( index ) => {

          dispatch( characterFocus( index ) )

        }

    }

};


const Interface = connect(

    mapStateToProps,
    mapDispatchToProps

)( Interface_Comp );


export default Interface