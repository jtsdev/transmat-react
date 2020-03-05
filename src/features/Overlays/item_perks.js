
import React  from 'react'


class ItemPerks extends React.Component {

    constructor( props ) {

        super( props );

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

    }

    render() {

        const item = this.props.item;

        let perkColumns;

        if ( item.socketDefs ) {
            perkColumns = buildPerkColumns(item.perks, item.socketDefs.columns, item.socketDefs.columnCount);
        }

        return (

            <div className="item_perks">
                {
                    perkColumns
                }
                <div className="perk_description_card">
                    <div className="perk_description_header">
                        <p className="socket_name"></p>
                        <p className="socket_type"></p>
                    </div>
                    <div className="perk_description">
                        <p className="perk_description_text"></p>
                    </div>
                </div>
            </div>

        )

    }

}


class PerkColumn extends React.Component {

    constructor( props ) {

        super( props );

    }

    render() {

        const sockets = this.props.sockets;
        const perk    = this.props.perk;

        const payload = buildColumn( sockets );

        return (

            <div className="perk_column">
                {
                    payload
                }
            </div>

        )

    }
}


class Perk extends React.Component {

    constructor( props ) {

        super( props );

        this.handleClick = this.handleClick.bind( this );

    }

    handleClick( e ) {

        e.stopPropagation();

        let activeCard   = document.querySelector( '.perk_description_card.open' );
        let activeSocket = document.querySelector( '.socket.active' );

        const socket = this.props.socket;

        if ( activeSocket === e.target ) {

            activeSocket.classList.remove( 'active' );
            activeCard.classList.remove( 'open' );

        } else if ( activeSocket ) {

            activeSocket.classList.remove( 'active' );
            e.target.classList.add( 'active' );

            document.querySelector( '.socket_name' ).innerText = socket.displayProperties.name;
            document.querySelector( '.socket_type' ).innerText = socket.itemTypeDisplayName;
            document.querySelector( '.perk_description_text' ).innerText = socket.displayProperties.description;

        } else {

            e.target.classList.add( 'active' );
            document.querySelector( '.perk_description_card' ).classList.add( 'open' );

            document.querySelector( '.socket_name' ).innerText = socket.displayProperties.name;
            document.querySelector( '.socket_type' ).innerText = socket.itemTypeDisplayName;
            document.querySelector( '.perk_description_text' ).innerText = socket.displayProperties.description;

        }

    }

    render() {

        const socket = this.props.socket;

        const url = 'url(https://bungie.net' + socket.displayProperties.icon + ')';

        return (

            <div className={ "socket" } style={{ backgroundImage: url }} onClick={ ( e ) => this.handleClick( e ) } />

        )

    }

}


// Helpers

    function buildPerkColumns( perks, sockets, count ) {

        let columns = [];

        for ( let i = 0; i < count; i++ ) {

            columns.push( <PerkColumn sockets={ sockets[ i ] } perk={ perks[ i ] } key={ i } /> )

        }

        return columns;

    }

    function buildColumn( sockets ) {

        let column = [];

        for ( let i = 0; i < sockets.length; i++ ) {

            column.push( <Perk socket={ sockets[ i ] } key={ i } /> )

        }

        return column;

    }



export default ItemPerks