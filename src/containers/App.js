
import { connect }          from 'react-redux'
import App_Comp             from '../App.js'
import { backgroundClick,
         itemsReady,
         loggingIn,
         loginSuccess     } from '../actions'


const mapStateToProps = state => {
// console.log( state );
    return {
        loginStatus: state.loginStatus,
        itemsReady:  state.itemsReady,
        switcher:    state.switcher
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onBackgroundClick: ( switcher )  => {

            dispatch( backgroundClick( switcher ) )

        },

        onItemsReady: () => {

            dispatch( itemsReady() )

        },

        onLoggingIn: () => {

          dispatch( loggingIn() )

        },

        onLoginSuccess: () => {

            dispatch( loginSuccess() )

        }


    }

};


const App = connect(

    mapStateToProps,
    mapDispatchToProps

)( App_Comp );


export default App