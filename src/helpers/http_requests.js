
export const apiKey = '0fcb5aca3a4c4b2caa7ef520feade6cd';

export function makeHttpPost( endpoint, params, callback, tokenVal ) {

    // Request Vars
    let http       = new XMLHttpRequest();

    const url        = "https://www.bungie.net/" + endpoint;
    const postParams = params;

    // Open Request and Set Headers
    http.open( "POST", url, true );
    http.setRequestHeader( "X-API-Key", apiKey );

    if ( tokenVal ) {

        http.setRequestHeader( "Authorization", "Bearer " + tokenVal );

    }

    http.onreadystatechange = function() { //Call On State Change

        if ( http.readyState === 4 && http.status === 200 ) {

            const resp = JSON.parse( http.responseText );

            callback( resp );

        }

    };

    http.send( JSON.stringify( postParams ) );

}

export function makeHttpGet( endpoint, callback, tokenVal, storedVal ) {

    const argLength = arguments.length;

    // Request Vars
    let http = new XMLHttpRequest();

    const url = "https://www.bungie.net/" + endpoint;

    // Open Request and Set Headers
    http.open( "GET", url, true );
    http.setRequestHeader( "X-API-Key", apiKey );

    if ( tokenVal ) {

        http.setRequestHeader( "Authorization", "Bearer " + tokenVal );

    }

    http.onreadystatechange = function() { //Call On State Change

        if ( http.readyState === 4 && http.status === 200 ) {

            const resp = JSON.parse( http.responseText );

            if ( argLength === 3 ) {

                callback( resp );

            } else {

                callback( resp, storedVal );

            }

        }

    };

    http.send();

}


export function userGet( endpoint, callback, tokenVal, storedVal ) {

    const argLength = arguments.length;

    // Request Vars
    let http = new XMLHttpRequest();

    const url = "https://www.bungie.net/" + endpoint;

    // Open Request and Set Headers
    http.open( "GET", url, true );
    http.setRequestHeader( "X-API-Key", apiKey );

    if ( tokenVal ) {

        http.setRequestHeader( "Authorization", "Bearer " + tokenVal );

    }

    http.onreadystatechange = function() { //Call On State Change

        if ( http.readyState === 4 && http.status === 200 ) {

            const resp = JSON.parse( http.responseText );

            if ( argLength === 3 ) {

                callback( resp );

            } else {

                callback( resp, storedVal );

            }

        }

    };

    http.send();

}

export function tokenPost ( endpoint, params, callback ) {

    // Request Vars
    let http       = new XMLHttpRequest();

    const url        = "https://www.bungie.net/Platform/" + endpoint;
    const postParams = params;

    // Open Request and Set Headers
    http.open( "POST", url, true );
    http.setRequestHeader( "X-API-Key", apiKey );

    http.onreadystatechange = function() { //Call On State Change

        if ( http.readyState === 4 && http.status === 200 ) {

            const resp = JSON.parse( http.responseText );

            callback( resp );

        }

    };

    http.send( JSON.stringify( postParams ) );

}
