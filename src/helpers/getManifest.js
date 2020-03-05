/**
 * Created by jtsjordan on 9/12/17.
 */


let SQL = require( 'sql.js' );

const file  = require( 'file-system' );
const req   = require( 'request' );
// const unzip = require( 'unzip' );


function manifestContentResponse( error, response, body ) {

    const parsedResponse = JSON.parse( body );
    const manifestFile   = fs.createWriteStream( 'manifest.zip' );

    req
        .get( 'https://www.bungie.net' + parsedResponse.Response.mobileWorldContentPaths.en )
        .pipe( manifestFile )
        .on( 'close', contentDownloaded );

}

function contentDownloaded() {


    // fs.open( 'manifest.zip', '' )

    fs.createReadStream( 'manifest.zip' )
    // .pipe( unzip.Parse() )
        .on( 'entry', function( entry ) {

            const ws = fs.createWriteStream( 'manifest2/' + entry.path );
            entry.pipe( ws );

        });

}

req({

    headers: {
        'X-API-Key': apiKey
    },
    uri: 'http://www.bungie.net/platform/Destiny2/Manifest/',
    method: 'GET'

}, manifestContentResponse );

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');
const uzip = require( 'unzip' );


// Run a query without reading the results
db.run("CREATE TABLE test (col1, col2);");
// Insert two rows: (1,111) and (2,222)
db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);

// Prepare a statement
let stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
stmt.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

// Bind new values
stmt.bind({$start:1, $end:2});
while(stmt.step()) { //
    let row = stmt.getAsObject();
    console.log(row);
    // [...] do something with the row of result
}

//
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://destinytransmat.com/sqlitedb', true);
// xhr.responseType = 'arraybuffer';
//
// xhr.onload = function(e) {
//     let uInt8Array = new Uint8Array(this.response);
//     let db = new SQL.Database(uInt8Array);
//
//     console.log(db.tables);
//
//     // let contents = db.exec("SELECT * FROM my_table");
//     // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
// };
// xhr.send();


// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/world_sql_content_0d95a6c3a0921567807d901b72e18e26.content.sqlite', true);
// xhr.responseType = 'arraybuffer';
//
// xhr.onload = function(e) {
//
//     console.log( this.response );
//
//     let uInt8Array = new Uint8Array(this.response);
//     let db = new SQL.Database(uInt8Array);
//
//     console.log(db);
//
//     // let contents = db.exec("SELECT * FROM my_table");
//     let contents = db.exec( "SELECT * FROM DestinyInventoryItemDefinition" );
//
//     console.log( contents );
//     // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
// };
// xhr.send();


// let xhr2 = new XMLHttpRequest();
// xhr2.open('GET', 'world_sql_content_0d95a6c3a0921567807d901b72e18e26.content.sqlite', true);
// xhr2.responseType = 'arraybuffer';
//
// xhr2.onload = function(e) {
//     let uInt8Array = new Uint8Array(this.response);
//     let db = new SQL.Database(uInt8Array);
//
//     console.log(db);
//
//     let contents2 = db.exec( "SELECT * FROM DestinyInventoryItemDefinition" );
//
//     console.log( contents2 );
//     // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
// };
// xhr2.send();
