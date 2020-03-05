import './normalize.css';
import './index.css';
import { createStore }           from 'redux'
import React                     from 'react';
import ReactDOM                  from 'react-dom';
import { Provider }              from 'react-redux'
import mainReducer               from './reducers'
import App                       from './containers/App';
import registerServiceWorker     from './registerServiceWorker';
import { beginAuth }             from './helpers/token_flow'
import { getUser }               from './helpers/get_data'

// ---


let db, accessT, refreshT;
// let store = createStore( mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
let store = createStore( mainReducer );


export let settings = [];


// Database Initialization

    let request = window.indexedDB.open( "TRANSMAT_TESTDB" );
    request.onerror = function( e ) {

        console.log( "Warning: Access to IndexedDB for application has been rejected." );

    };
    request.onupgradeneeded = function ( e ) {

        db = e.target.result;

        let objectStore = db.createObjectStore( "TOKENS", { keyPath: "type" } );
            objectStore.createIndex( "type", "type", { unique: true } );
            objectStore.transaction.oncomplete = function( e ) {

                console.log( 'Token object store has been successfully created.', objectStore );

            };

        let settingsStore = db.createObjectStore( "SETTINGS", { keyPath: "name" } );
            settingsStore.createIndex( "name", "name", { unique: true } );
            settingsStore.transaction.oncomplete = function( e ) {

                console.log( 'Settings object store has been successfully created.', settingsStore );

                putSetting( "Show Power Levels", true, false, -1 );
                putSetting( "Show Damage Types", true, false, -1 );
                putSetting( "Kinetic Icons", false, true, 1 );

            }

    };
    request.onsuccess = function( e ) {

        db = e.target.result;

        // console.log(db);

        // Check for SETTINGS store
            if ( db.objectStoreNames[ 1 ] ) {

                getToken( "Access" );
                loadSettings();

            } else {

                console.log( 'No SETTINGS store in database. Creating one now.' );

                db.close();
                createObjectStore( "SETTINGS", "name" );

            }

    };


// Database Methods

    // Store Methods
        function createObjectStore( storeName, keyName ) {

            let versionCheck = window.indexedDB.open( "TRANSMAT_TESTDB" );
            versionCheck.onerror   = function( e ) {

                console.log( "Warning: Access to IndexedDB for application has been rejected." );

            };
            versionCheck.onsuccess = function( e ) {

                let database = e.target.result;
                console.log(database.version);
                let version  = parseInt( database.version, 10 );
                // update radix

                database.close();

                // Create New Version / Store

                let request = window.indexedDB.open( "TRANSMAT_TESTDB", version + 1 );
                request.onerror = function( e ) {

                    console.log( "Warning: Access to IndexedDB for application has been rejected." );

                };
                request.onupgradeneeded = function ( e ) {

                    db = e.target.result;

                    let objectStore = db.createObjectStore( storeName, { keyPath: keyName } );

                    objectStore.createIndex( keyName, keyName, { unique: true } );
                    objectStore.transaction.oncomplete = function( e ) {

                        console.log( storeName + ' object store has been successfully created.', objectStore );

                        if ( storeName === "SETTINGS" ) {

                            putSetting( "Show Power Levels", true , false, -1 );
                            putSetting( "Show Damage Types", true , false, -1 );
                            putSetting( "Kinetic Icons"    , false, true ,  1 );

                        }

                    };

                };
                request.onsuccess = function( e ) {

                    db = e.target.result;

                    getToken( "Access" );

                    loadSettings();

                };


            };

        }

    // Token Methods
        // function putToken( type, type2 ) {

        //     let transaction = db.transaction( "TOKENS", "readwrite" );
        //     let objectStore = transaction.objectStore( "TOKENS" );

        //     let token = { "type": type, "value": 100000001, "readyin": 1800, "expires": 7776000, "startTime": 60 };

        //     let req = objectStore.put( token );

        //     req.onsuccess = function( evt ) {

        //         console.log( 'Updated: ', type );

        //         if ( type2 ) {
        //             putToken( "Refresh" );
        //         }

        //     };

        // }

        function getToken( type ) {

            let transaction = db.transaction( "TOKENS", "readwrite" );
            let objectStore = transaction.objectStore( "TOKENS" );

            let req = objectStore.get( type );

            req.onsuccess = function( evt ) {

                let token = evt.target.result;

                if ( token ) {

                    if ( type === "Access" )  { accessT = token; getToken( "Refresh" ) }
                    else if ( type === "Refresh" ) { refreshT = token; beginAuth( accessT, refreshT, db ) }

                } else {

                    // load app -> login rings
                    // authSuccess();

                    beginAuth( null, null, db );

                }

            };

        }

        export function deleteToken( type ) {

            let transaction = db.transaction( "TOKENS", "readwrite" );
            let objectStore = transaction.objectStore( "TOKENS" );

            let req = objectStore.delete( "Refresh" );

            req.onsuccess = function( evt ) {

                console.log( type + " Deleted");

                if ( type === "Refresh" ) {

                    deleteToken( "Access" );

                } else if ( type === "Access" ) {

                    console.log( 'All Tokens Deleted' );
                    // window.location.reload();

                }

            }

        }

    // Settings Methods
        export function getSetting( name ) {

            let transaction = db.transaction( "SETTINGS", "readwrite" );
            let objectStore = transaction.objectStore( "SETTINGS" );

            let req = objectStore.get( name );

            req.onsuccess = function( e ) {

                let setting = e.target.result;

                if ( setting ) {

                    // console.log( 'Setting found: ', name );
                    settings.push( setting );

                } else {

                    console.log( 'No setting found for: ', name );
                    switch ( name ) {

                        case "Show Power Levels":
                            getSetting( "Show Power Levels" );
                            break;

                        case "Show Damage Types":
                            getSetting( "Show Damage Types" );
                            break;

                        case "Kinetic Icons":
                            getSetting( "Kinetic Icons" );
                            break;

                        default:
                            console.log( 'Unknown Setting Name: ', name );

                    }

                }

            };

        }

        export function putSetting( name, isActive, isSub, parent ) {

            let setting = { "name": name, "isActive": isActive, "isSub": isSub, "parent": parent };

            let transaction = db.transaction( "SETTINGS", "readwrite" );
            let objectStore = transaction.objectStore( "SETTINGS" );

            let req = objectStore.put( setting );

            req.onsuccess = function( evt ) {

                console.log( 'Updated Setting: ', name );
                loadSettings();

            };

        }

        function loadSettings() {

            settings = [];

            getSetting( "Show Power Levels" );
            getSetting( "Show Damage Types" );
            getSetting( "Kinetic Icons" );

        }


// ---

export let accToken;
export function authSuccess( accessToken, refreshToken ) {

    const isDemo = true;

    if ( accessToken && !isDemo ) {

        accToken = accessToken;

        getUser( accessToken );

        // Loading Rings
        ReactDOM.render(

            <Provider store={ store }>
                <App needAuth={ false } />
            </Provider>,

            document.getElementById( 'root' )

        );

        registerServiceWorker();

    } else {

        // Login Rings
        ReactDOM.render(

            <Provider store={ store }>
                <App needAuth={ true } />
            </Provider>,

            document.getElementById( 'root' )

        );

        registerServiceWorker();

    }

}

// ---