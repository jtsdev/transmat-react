


import { makeHttpGet, userGet }  from './http_requests'
// import { _demoAccount }          from './demoAccount'
// import { _subclassDefs }         from './subclassTalentDefs'


let accessToken, membId, membType;
let instances, perks, stats, grids;

let itemsReady = false;
let refreshed  = false;
let haveDefs   = false;

let itemDefinitions   = {};

export let charactersArray = [], allItemsArray = [];


let xhr = new XMLHttpRequest();
// xhr.open( 'GET', 'https://destinytransmat.com/manifest.php', true );
xhr.open( 'GET', 'https://jtsdev.github.io/transmat-landing/manifest.php', true );
xhr.responseType = 'json';

xhr.onload = function(e) {

    itemDefinitions = this.response;

    haveDefs = true;

};
xhr.send();


export function triggerItemsReady( callback ) {

    if ( itemsReady ) {

        callback();

    } else {

        setTimeout( function() {

            triggerItemsReady( callback )

        }, 500 );

    }

}

export function triggerItemsRefreshed( callback, oldState ) {

    if ( refreshed ) {

        callback( oldState );

    } else {

        setTimeout( function() {

            triggerItemsRefreshed( callback, oldState )

        }, 1000 );

    }

}


function buildCharacters( charObj, progress, defaultIdOrder, indexOrder ) {

    let charArray = [];
    let charIndex = 0;

    for ( let i = 0; i < defaultIdOrder.length; i++ ) {

        let currentIndex = indexOrder[ i ];
        let currentId    = defaultIdOrder[ currentIndex ];

        let thisChar = charObj[ currentId ];
        let thisProg = progress[ currentId ];

        thisChar.characterIndex = charIndex;
        thisChar.progress       = thisProg;

        charIndex++;

        charArray.push( thisChar );

    }

    return charArray;

}

// function buildItems( eqpObj, invObj, vaultArray, defaultIdOrder, indexOrder ) {

//     let itemArray = [];


//     // Loop Characters
//         for ( let i = 0; i < defaultIdOrder.length; i++ ) {

//             let currentIndex = indexOrder[ i ];
//             let currentId    = defaultIdOrder[ currentIndex ];

//             let thisInv  = invObj[ currentId ];
//             let thisEqp  = eqpObj[ currentId ];

//             let invItems = thisInv.items;
//             let eqpItems = thisEqp.items;

//         // Loop Inventory
//             for ( let x = 0; x < invItems.length; x++ ) {

//                 let thisItem = {
//                     ...invItems[ x ],
//                     characterIndex: i,
//                     isEquipped: false
//                 };

//                 itemArray.push( thisItem );

//             }

//         // Loop Equipped
//             for ( let y = 0; y < eqpItems.length; y++ ) {

//                 let thisItem = {
//                     ...eqpItems[ y ],
//                     characterIndex: i,
//                     isEquipped: true
//                 };

//                 itemArray.push( thisItem );

//             }

//         }

//     // Add Items from Vault / Inventory
//         for ( let i = 0; i < vaultArray.length; i++ ) {

//             let thisItem = {
//                 ...vaultArray[ i ],
//                 characterIndex: -1,
//                 isEquipped: false
//             };

//             itemArray.push( thisItem );

//         }


//     return addItemDefs( itemArray );

// }



// function addItemDefs( itemArray ) {

//     let builtItems = [];

//     for ( let i = 0; i < itemArray.length; i++ ) {

//         let item = itemArray[ i ];
//         let hash = item.itemHash;

//         let itemDef = {
//             ...itemDefinitions[ hash ],
//             ...item
//         };

//         builtItems.push( itemDef );

//     }

//     return addInstances( builtItems );

// }

// function addInstances( itemArray ) {

//     for ( let i = 0; i < itemArray.length; i++ ) {

//         let item       = itemArray[ i ];
//         let instanceId = item.itemInstanceId;

//         if ( instanceId ) {

//             item.instance = instances[ instanceId ];

//         }

//     }

//     return addPerks( itemArray );

// }

// function addPerks( itemArray ) {

//     for ( let i = 0; i < itemArray.length; i++ ) {

//         let item       = itemArray[ i ];
//         let instanceId = item.itemInstanceId;

//         if ( instanceId ) {

//             if ( perks[ instanceId ] ) {

//                 const perkArray = perks[ instanceId ].perks;

//                 item.perks = perkArray ? perkArray : [];

//             }

//         // Add Talent Grid Defs to Subclasses
//             if ( item.inventory.bucketTypeHash === 3284755031 && !relicCheck( item.itemTypeDisplayName ) ) {

//                 // Subclass Defs
//                     const gridHash = item.talentGrid.talentGridHash;
//                     item.talentDef = _subclassDefs[ gridHash ];

//                 // Talent Grid Node States
//                     item.nodeStates = grids[ instanceId ].nodes;

//             }

//         }

//     }

//     return addStats( itemArray );

// }

// function addStats( itemArray ) {

//     for ( let i = 0; i < itemArray.length; i++ ) {

//         let item       = itemArray[ i ];
//         let instanceId = item.itemInstanceId;

//         if ( instanceId ) {
//             if ( stats[ instanceId ] ) {

//                 const statsObj = stats[ instanceId ].stats;

//                 item.instanceStats = statsObj ? statsObj : {};

//             }
//         }

//     }

//     return addSockets( itemArray );

// }

// function addSockets( itemArray ) {

//     for ( let i = 0; i < itemArray.length; i++ ) {

//         let item    = itemArray[ i ];
//         let sockets = item.sockets;

//         if ( sockets ) {

//             let sockTypes = sockets.socketCategories;

//             for ( let x = 0; x < sockTypes.length; x++ ) {

//                 let sockHash = sockTypes[ x ].socketCategoryHash;

//                 if ( sockHash === 4241085061 || sockHash === 2518356196 ) {

//                     item.socketDefs = buildSockets( sockTypes[ x ].socketIndexes, sockets.socketEntries );

//                 }

//             }

//         }

//     }

//     return itemArray;

// }

// function buildSockets( indexes, columns ) {

//     let grid = {
//         columnCount: indexes.length,
//         columns: {}
//     };

//     for ( let y = 0; y < indexes.length; y++ ) {

//         const index  = indexes[ y ];
//         const hashes = columns[ index ].reusablePlugItems;

//         grid.columns[ y ] = [];

//         for ( let z = 0; z < hashes.length; z++ ) {

//             const plugHash = hashes[ z ].plugItemHash;

//             const def = {
//                 ...itemDefinitions[ plugHash ]
//             };

//             let sockDef = {
//                 displayProperties:   def.displayProperties,
//                 itemTypeDisplayName: def.itemTypeDisplayName,
//                 perks:               def.perks
//             };

//             grid.columns[ y ].push( sockDef );

//         }

//     }

//     return grid;

// }


export function getUser( aToken ) {

    accessToken = aToken;

    const endpoint = "Platform/User/GetCurrentBungieAccount/";
    // const endpoint = "User/GetMembershipsForCurrentUser/";

    userGet( endpoint, userVars, aToken.value );

}

function userVars( resp ) {

    // console.log( '- getUser -  Response: ' );
    // console.log( resp );

    const destinyMembership = resp.Response.destinyMemberships[ 0 ];

    const displayName = destinyMembership.displayName;

    membId   = destinyMembership.membershipId;
    membType = destinyMembership.membershipType;

    getAccountSummary();

}



export function getAccountSummary() {

    const endpoint = "Platform/Destiny2/" + membType + "/Profile/" + membId + "/?components=100,102,103,200,201,202,204,205,300,301,302,304,305,306,307,308";

    makeHttpGet( endpoint, accountSummaryResponse, accessToken.value );

}

export function useDemoAccountSummary() {

    const fakeDemo =  { 
        "Response": {
            "profileInventory": {
                "data": {}
            },
            "characters": {
                "data": {}
            },
            "characterEquipment": {
                "data": {}
            },
            "characterInventories": {
                "data": {}
            },
            "characterProgressions": {
                "data": {}
            },
            "itemComponents": {
                "instances": {
                    "data": {}
                },
                "perks": {
                    "data": {}
                },
                "stats": {
                    "data": {}
                },
                "talentGrids": {
                    "data": {}
                }
            }
        }
    }

    // accountSummaryResponse( _demoAccount );
    accountSummaryResponse( fakeDemo );

}

function accountSummaryResponse( resp ) {

    const charObj    = resp.Response.characters.data;

    const eqpObj     = resp.Response.characterEquipment.data;
    const invObj     = resp.Response.characterInventories.data;
    const vaultArray = resp.Response.profileInventory.data.items;

    const progress   = resp.Response.characterProgressions.data;
    const itemComps  = resp.Response.itemComponents;

          instances  = itemComps.instances.data;
          perks      = itemComps.perks.data;
          stats      = itemComps.stats.data;
          grids      = itemComps.talentGrids.data;


    // -----------


    let lastPlayedTimes = [];
    let defaultIdOrder  = [];

    Object.keys( charObj ).forEach( function( currentId ) {

        const dateTime = charObj[ currentId ].dateLastPlayed;

        const timeElapsed = Date.parse( dateTime );

        lastPlayedTimes.push( timeElapsed );
        defaultIdOrder.push( currentId );

    });

    const indexOrder = orderIndexes( lastPlayedTimes );


    // -----------


    charactersArray = buildCharacters( charObj, progress, defaultIdOrder, indexOrder );

    setItemsArray( eqpObj, invObj, vaultArray, defaultIdOrder, indexOrder );

}

function setItemsArray( eqpObj, invObj, vaultArray, defaultIdOrder, indexOrder ) {

        if ( haveDefs ) {

            // allItemsArray = buildItems( eqpObj, invObj, vaultArray, defaultIdOrder, indexOrder );

            itemsReady = true;
            refreshed  = true;

        } else {

            setTimeout( function() {

                setItemsArray( eqpObj, invObj, vaultArray, defaultIdOrder, indexOrder );

            }, 500 );

        }

}


export function updateData( callback, oldState ) {

    refreshed = false;

    getAccountSummary();

    if ( callback ) {

        triggerItemsRefreshed( callback, oldState );

    } else {

        // console.log( '- Update Complete -' );

    }

}

export function refreshItems( callback ) {

    itemsReady = false;

    getAccountSummary();

    if ( callback ) {

        triggerItemsReady( callback );

    } else {

        // console.log( '- Update Initiated -' );

    }

}


function getManifest() {

    const endpoint = "Platform/Destiny2/Manifest/";

    makeHttpGet( endpoint, manifestResponse, accessToken.value );

}

function manifestResponse( resp ) {

    // console.log( '- Manifest Response -' );
    // console.log( resp );

    const endpoint = resp.Response.mobileWorldContentPaths.en;

    makeHttpGet( endpoint, contentResponse, accessToken.value );

}

function contentResponse( resp ) {

    // console.log( '- Content Response -' );
    // console.log( resp );

}


// Returns true if the subclass has a 'relic' state
function relicCheck( name ) {

    return name === 'Hunter Relic' || name === 'Titan Relic' || name === 'Warlock Relic';

}


function orderIndexes( timeArray ) {

    let indexOrder = [];

    if ( timeArray.length === 1 ) {


        // One Character

            indexOrder.push( 0 );


    } else if ( timeArray.length === 2 ) {


        // Two Characters

        if ( timeArray[ 0 ] > timeArray[ 1 ] ) {

            // 0 is first
                indexOrder.push( 0 );
                indexOrder.push( 1 );

        } else {

            // 1 is first
                indexOrder.push( 1 );
                indexOrder.push( 0 );

        }


    } else {


        // Three Characters

        if ( timeArray[ 0 ] > timeArray[ 1 ] ) {

            if ( timeArray[ 0 ] > timeArray[ 2 ] ) {

                // 0 is first
                    indexOrder.push( 0 );
                    indexOrder.push( 2 );
                    indexOrder.push( 1 );

            } else {

                // 2 is first
                    indexOrder.push( 2 );
                    indexOrder.push( 0 );
                    indexOrder.push( 1 );

            }

        } else {

            if ( timeArray[ 1 ] > timeArray[ 2 ] ) {

                // 1 is first
                    indexOrder.push( 1 );
                    indexOrder.push( 2 );
                    indexOrder.push( 0 );

            } else {

                // 2 is first
                    indexOrder.push( 2 );
                    indexOrder.push( 1 );
                    indexOrder.push( 0 );

            }

        }


    }

    return indexOrder;

}
