
import { connect }           from 'react-redux'
import Rings_Comp            from '../components/rings'
// import { refreshItems }      from '../helpers/get_data'
// import { handleLoginClick,
import { backgroundClick,
         itemRefresh,
         itemsReady,
         showSettings,
         showAbout,
         showLogout,
         showProgress,
         showLoadouts,
         showTower,
         hideOverlays,
         centerGhost       } from '../actions'


const mapStateToProps = state => {

    return {
        rings:       state.rings,
        ghost:       state.ghost,
        focus:       state.gearBar,
        interface:   state.mainInterface,
        itemsReady:  state.itemsReady,
        loginStatus: state.loginStatus,
        overlay:     state.overlays
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onLoginClick: ()  => {

            // dispatch( handleLoginClick() );
            dispatch( backgroundClick( 'front' ) );

        },

        itemRefresh: () => {

            dispatch( itemRefresh() )

        },

        onItemsReady: () => {

            dispatch( itemsReady() );

        },

        showSettings: () => {

          dispatch( showSettings() )

        },

        showAbout: () => {

            dispatch( showAbout() )

        },

        showLogout: () => {

          dispatch( showLogout() )

        },

        showProgress: () => {

            dispatch( showProgress() )

        },

        showLoadouts: () => {

            dispatch( showLoadouts() )

        },

        showTower: () => {

            dispatch( showTower() )

        },

        hideOverlays: () => {

            dispatch( hideOverlays() );
            dispatch( centerGhost() )

        }


    }

};


const Rings = connect(

    mapStateToProps,
    mapDispatchToProps

)( Rings_Comp );


export default Rings