
import { authSuccess } from '../index'
import { tokenPost   } from './http_requests'


let authDB;


// Auth Entry
export function beginAuth( accessToken, refreshToken, db ) {

    if ( accessToken ) {

        useStoredTokens( accessToken, refreshToken, db );

    // Check URL for code
    } else {

        authDB = db;

        const code = getUrlCode();

        // URL Has Code
        if ( code ) {

            useUrlCode( code );

        // No Code
        } else {

            authSuccess();

        }

    }

}



// -- URL Code Check --

    // Get Code URI
        function getUrlCode() {

            const param = 'code';

            return getUrlParameter( param );

        }

    // Parse URL for URI
        function getUrlParameter( name ) {

            const currentUrl = window.location.href;
            const paramName  = name.replace( /[\[\]]/g, "\\$&" );
            // console.log(paramName);

            const regex = new RegExp( "[?&]"+ paramName +"(=([^&#]*)|&|#|$)" ),
                results = regex.exec( currentUrl );

            if ( !results ) return null;
            if ( !results[ 2 ] ) return '';

            return decodeURIComponent( results[ 2 ].replace( /\+/g, " " ) );

        }

// --------------



// -- Use URL Code for Auth --

    // Use Code
        function useUrlCode( code ) {

            const jCode = { "code": code };
            getTokensWithCode( jCode );

        }

    // Tokens From Code
        function getTokensWithCode( jCode ) {

            const endpoint = "App/GetAccessTokensFromCode/";
            tokenPost( endpoint, jCode, tokenResponseRouter );

        }

// --------------



// -- Use Saved Token for Auth --


        // Use Tokens from Storage
            export function useStoredTokens( access, refresh, db ) {

                authDB = db;

                if ( tokenReadyCheck( refresh ) ) {

                    // Refresh Token Valid
                    getTokensFromRefresh( refresh );

                } else if ( tokenReadyCheck( access ) ) {

                    // Access Token Valid
                    authSuccess( access, refresh );

                } else {

                    // No Valid Tokens
                    authSuccess();

                }

            }

        // Tokens from Refresh
            function getTokensFromRefresh( refresh ) {

                const jToken = { "refreshToken": refresh.value };

                const endpoint = "App/GetAccessTokensFromRefreshToken/";
                tokenPost( endpoint, jToken, tokenResponseRouter );

            }

// --------------


// -- Token Flow Request Responses --

    // Response Router
        function tokenResponseRouter( response ) {

            if ( response.ErrorCode === 2106 ) {

                handleExpired();

            } else if ( response.ErrorCode === 1 ) {

                handleValid( response.Response );

            } else {

                handleUnknown( response );

            }

        }

        // Expired Token
            function handleExpired() {

                console.log( '- handledExpired -' );

            }

        // Valid Tokens
            function handleValid( resp ) {

                stampTokens( resp.accessToken, resp.refreshToken );

            }

        // Unknown Error
            function handleUnknown( response ) {

                console.log( 'Unknown Error Code: ' );
                console.log( response );

            }

// --------------


// -- Handle New Tokens --

    // Add Timestamp
        function stampTokens( accessToken, refreshToken ) {

            const startTime = Date.now();

            accessToken.startTime    = startTime;
            refreshToken.startTime = startTime;

            storeTokens( accessToken, refreshToken );

        }

    // Store Tokens
        function storeTokens( access, refresh ) {

            putToken( "Access", access, "Refresh", refresh );

        }

        function putToken( type, token, type2, token2 ) {

            let transaction = authDB.transaction( "TOKENS", "readwrite" );
            let objectStore = transaction.objectStore( "TOKENS" );

            let thisToken = { "type": type, "value": token.value, "readyin": token.readyin, "expires": token.expires, "startTime": token.startTime };

            let req = objectStore.put( thisToken );

            req.onsuccess = function( evt ) {

                console.log( 'Updated: ', type );

                if ( type2 ) {

                    putToken( type2, token2, null, token );

                } else {

                    authSuccess( token2, token )

                }

            };

        }


// --------------


// -- Check Token Timestamps --

    function tokenReadyCheck( token ) {

        const timeNow  = Date.now();
        const timeThen = token.startTime;

        const elapsed  = timeNow - timeThen;

        const readyMS  = token.readyin * 1000;
        const expireMS = token.expires * 1000;

        return elapsed > readyMS && elapsed < expireMS;

    }

// ---------------