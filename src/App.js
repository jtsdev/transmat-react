
import './App.css';
import React, { Component } from 'react';
import {
    charactersArray,
    allItemsArray,
    triggerItemsReady
} from './helpers/get_data'
import Ghost from './containers/Ghost'
import Scanner from './features/Scanner/Scanner'
import Interface from './containers/Interface'
import Overlay from './features/Overlays/Overlays'


class App_Comp extends Component {

    constructor(props) {

        super(props);

        this.state = {

            memberId: '',
            memberType: 0,
            characterCount: 1,
            characters: charactersArray,
            allItems: allItemsArray

        };

        this.setItemsReady = this.setItemsReady.bind(this);

        if (!this.props.needAuth) { this.props.onBackgroundClick(this.props.switcher) }

    }

    componentDidMount() {

        if (this.props.needAuth) {

            this.props.onLoggingIn();

        }

    }

    componentDidUpdate() {

        if (this.state.allItems !== allItemsArray) {

            this.setState({
                characters: charactersArray,
                allItems: allItemsArray
            });

        }

    }

    componentWillMount() {
        triggerItemsReady(this.setItemsReady);
    }

    setItemsReady() {

        if (this.state.allItems !== allItemsArray) {

            this.setState({
                characters: charactersArray,
                allItems: allItemsArray
            });

        }

        this.props.onItemsReady();

    }

    render() {

        // triggerItemsReady( this.setItemsReady );

        const loginStatus = this.props.loginStatus;
        const needAuth = this.props.needAuth;

        return (

            <div className="App">
                <div className="shell">
                    <div className="background" onClick={loginStatus === 'logged_in' ? () => this.props.onBackgroundClick(this.props.switcher) : null}>
                        {/* <div className="background" onClick={ () => this.props.onBackgroundClick( this.props.switcher ) }> */}
                        <Ghost needAuth={needAuth} />
                        <Scanner />
                        {
                            // this.props.itemsReady ?
                            true ?
                                <Interface characters={this.state.characters} items={this.state.allItems} />
                                : <div className="lower_wrap trans" />
                        }
                        <Overlay characters={this.state.characters} items={this.state.allItems} />

                    </div>
                </div>
            </div>

        )

    }

}


export default App_Comp



