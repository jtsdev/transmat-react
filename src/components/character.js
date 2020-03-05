import React        from 'react'
import Loadout      from '../containers/Loadout'
import InventoryBar from '../features/InventoryBar/InventoryBar'
import StoredBar    from '../features/StoredBar/StoredBar'


class Character_Comp extends React.Component {

    constructor( props ) {

        super( props );

        this.handleClick = this.handleClick.bind( this );

    }

    componentDidMount() {

        // this.props.onMount( this.props.subclassFocus );

    }

    handleClick( e ) {

        e.stopPropagation();

    }

    render() {

        const type        = this.props.type,
              typeFoc     = this.props.typeFocus,
              charFoc     = this.props.charFocus,
              focusItems  = this.props.focusItems,
              storedItems = this.props.storedItems;

        let invItems = [], miscItems = [];

        for ( let i = 0; i < storedItems.length; i++ ) {

            switch ( storedItems[ i ].inventory.bucketTypeHash ) {

                case 2973005342:   invItems.push( storedItems[ i ] );    break;     // shader
                case 3313201758:   invItems.push( storedItems[ i ] );    break;     // mod
                case 1469714392:   invItems.push( storedItems[ i ] );    break;     // redeemable

                default:

                    miscItems.push( storedItems[ i ] );

            }

        }

        const showLoadout   = type === 'default' || type === 'inventory_focus' || type === 'type_focus' || type === 'stored_focus' || type === 'subclass_focus' || type === 'item_details' || type === 'item_actions';
        const showInventory = type === 'default' || type === 'inventory_focus' || typeFoc === 'cons' || typeFoc === 'mods' || typeFoc === 'shad';


        return (

            <div className="lower_wrap">
                {
                    showLoadout  ?

                        <div className="main_bar">
                            <Loadout charFocus={ charFoc } items={ focusItems } />
                        </div> : null
                }
                {
                    showInventory ?

                        <InventoryBar charFocus={ charFoc } items={ invItems } /> : null
                }
                <StoredBar charFocus={ charFoc } items={ miscItems } />
            </div>

        )

    }

}


export default Character_Comp