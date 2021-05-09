const MongoClient = require('mongodb').MongoClient;
const dbName = 'gps-project-database';
const uri = `mongodb+srv://admin:admin@cluster0.ebqtm.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
let db;

/* Connect to the database */
function connect(callback) {

     client.connect(err => {

          if(!err) {
               db = client.db(dbName);
               console.log(`[database] connected to '${dbName}'`);
               callback();
          }
          else {
               console.log(`[database] ${err}`);
               close();
          }
     });
}

/* Get a database reference */
function get() {
     return db;
}

/* Close the database */
function close() {
     client.close();
}

module.exports = { connect, get, close };