const MongoClient = require ('mongodb').MongoClient;
const connectionString = process.env.MONGODB_URI;
let cachedDB = null;

module.exports = connect = () => {
  if ( cachedDB ) {
    console.log('Using cached database instance');
    return Promise.resolve(cachedDb);
  }
  console.log('Using new database connection');
  return MongoClient.connect(
      connectionString,
      { useUnifiedTopology: true }
  ).then(db => {
    cachedDb = db;
    return cachedDb;
  });
}
