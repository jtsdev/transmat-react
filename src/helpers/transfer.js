
import { makeHttpPost }  from './http_requests'
import { updateData }    from './get_data'
import { accToken }      from '../index'


const transferEndpoint  = 'Platform/Destiny2/Actions/Items/TransferItem/';
const equipEndpoint     = 'Platform/Destiny2/Actions/Items/EquipItem/';
// const equipManyEndpoint = 'Platform/Destiny2/Actions/Items/EquipItems/';

let refreshCallback, oldUpdateState;


export function transferRouter( item, destination, chars, itemSibs, updateState, refreshCB ) {

    oldUpdateState  = updateState;
    refreshCallback = refreshCB;

    // On Character
        if ( item.location === 1 ) {

            charToCharProcess( item, destination, chars, itemSibs );

   // In Vault
        } else if ( item.location === 2 ) {

            transferFromVault( item, destination );

        }

}


// Character to Character Item Transfer Process
    function charToCharProcess( item, destination, chars, itemSibs ) {

        const location = getLocation( item, chars );

        // check equip
            item.instance.isEquipped ? equipStep() : toVaultStep();

            function equipStep() {

                const replacementId = itemSibs[ 0 ].itemTypeDisplayName !== 'Quest Step' && itemSibs[ 0 ].inventory.tierType < 6 ? itemSibs[ 0 ].itemInstanceId : commonFirst( itemSibs );

                const params = {
                    characterId: location,
                    itemId: replacementId,
                    membershipType: chars[ 0 ].membershipType
                };

                makeHttpPost( equipEndpoint, params, equipStepResponse, accToken.value );

            }

            function equipStepResponse( resp ) {

                // console.log('equipStep response: ' );
                // console.log( resp );

                if ( resp.ErrorCode !== 1 ) {

                    alert( resp.Message );

                } else {

                    toVaultStep();

                }

            }

            function toVaultStep() {

                const params = {
                    itemReferenceHash: item.hash,
                    stackSize:         1,
                    transferToVault:   true,
                    itemId:            item.itemInstanceId ? item.itemInstanceId : null,
                    characterId:       location,
                    membershipType:    destination.membershipType
                };

                makeHttpPost( transferEndpoint, params, toVaultStepResponse, accToken.value );

            }

            function toVaultStepResponse( resp ) {

                // console.log( 'toVaultStep response: ' );
                // console.log( resp );

                if ( resp.ErrorCode !== 1 ) {

                    alert( resp.Message );

                } else {

                    fromVaultStep();

                }

            }

            function fromVaultStep() {

                const params = {
                    itemReferenceHash: item.hash,
                    stackSize:         1,
                    transferToVault:   false,
                    itemId:            item.itemInstanceId ? item.itemInstanceId : null,
                    characterId:       destination.characterId,
                    membershipType:    destination.membershipType
                };

                makeHttpPost( transferEndpoint, params, fromVaultStepResponse, accToken.value );

            }

            function fromVaultStepResponse( resp ) {

                // console.log( 'fromVaultStep response: ' );
                // console.log( resp );

                if ( resp.ErrorCode !== 1 ) {

                    alert( resp.Message );

                } else {

                    // console.log( '- Character to Character Transfer Complete -' );
                    updateData( refreshCallback, oldUpdateState );

                }

            }

    }


// Equip
    export function equipItem( item, chars, updateState, refreshCB ) {

        oldUpdateState  = updateState;
        refreshCallback = refreshCB;

        const params = {
            characterId: getLocation( item, chars ),
            itemId: item.itemInstanceId,
            membershipType: chars[ 0 ].membershipType
        };

        makeHttpPost( equipEndpoint, params, equipResponse, accToken.value );

    }

// To Vault
    export function transferToVault( item, location, destination, updateState, refreshCB ) {

        oldUpdateState  = updateState;
        refreshCallback = refreshCB;

        const params = {
            itemReferenceHash: item.hash,
            stackSize:         1,
            transferToVault:   true,
            itemId:            item.itemInstanceId ? item.itemInstanceId : null,
            characterId:       location,
            membershipType:    destination.membershipType
        };

        makeHttpPost( transferEndpoint, params, toVaultResponse, accToken.value );

    }

// From Vault
    function transferFromVault( item, destination ) {

        const params = {
            itemReferenceHash: item.hash,
            stackSize:         1,
            transferToVault:   false,
            itemId:            item.itemInstanceId ? item.itemInstanceId : null,
            characterId:       destination.characterId,
            membershipType:    destination.membershipType
        };

        makeHttpPost( transferEndpoint, params, fromVaultResponse, accToken.value );

    }



// Responses
    function equipResponse( resp ) {

        if ( resp.ErrorCode !== 1 ) {

            alert( resp.Message );

        } else {

            // console.log( '- Equip Complete -' );
            updateData( refreshCallback, oldUpdateState );

        }

    }
    function fromVaultResponse( resp ) {

        if ( resp.ErrorCode !== 1 ) {

            alert( resp.Message );

        } else {

            // console.log( '- Vault to Character Transfer Complete -' );
            updateData( refreshCallback, oldUpdateState );

        }

    }
    function toVaultResponse( resp ) {

        if ( resp.ErrorCode !== 1 ) {

            alert( resp.Message );

        } else {

            // console.log( '- Transfer to Vault Complete -' );
            updateData( refreshCallback, oldUpdateState );

        }

    }




function getLocation( item, chars ) {

    const index = item.characterIndex;
    return chars[ index ].characterId;

}

function commonFirst( itemSibs ) {

    let currentLow = itemSibs[ 1 ].itemTypeDisplayName !== 'Quest Step' ? itemSibs[ 1 ] : itemSibs[ 2 ];

    for ( let i = 2; i < itemSibs.length; i++ ) {

        let nextItem = itemSibs[ i ];

        // Skip Quest Items
            if ( nextItem.itemTypeDisplayName !== 'Quest Step' ) {

            // Tier is lower than current, or Tier is lower than exotic ( 6 )
                if ( nextItem.inventory.tierType < currentLow.inventory.tierType || nextItem.inventory.tierType < 6 ) {

                    return nextItem.itemInstanceId;

                }
            }

    }

    return currentLow.itemInstanceId;

}


// error codes

// 1    success
// 1656 cant do action on equipped item
// 1623 item not found