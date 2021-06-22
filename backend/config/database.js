const MongoClient = require('mongodb').MongoClient;
const dbName = 'gps-project-database';
//const uri = `mongodb+srv://admin:admin@cluster0.ebqtm.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const uri = `mongodb://admin:admin@cluster0-shard-00-00.ebqtm.mongodb.net:27017,cluster0-shard-00-01.ebqtm.mongodb.net:27017,cluster0-shard-00-02.ebqtm.mongodb.net:27017/${dbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

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

module.exports = { connect, get, close, urlDatabase:uri };