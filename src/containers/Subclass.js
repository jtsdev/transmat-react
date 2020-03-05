import { connect }          from 'react-redux'
import { setSubclassFocus } from '../actions'
import SubclassFocus        from '../components/subclass_focus'


const mapStateToProps = state => {

    return {
        subFocus: state.focusSubclass
    }

};

const mapDispatchToProps = dispatch => {

    return {

        onSwitchSub: ( subclass ) => {

            dispatch( setSubclassFocus( subclass ) )

        }

    }

};


const Subclass = connect(
    mapStateToProps,
    mapDispatchToProps
)( SubclassFocus );


export default Subclass