const MongoClient = require ('mongodb').MongoClient;
const connectionString = "mongodb+srv://b6H7PBTD4GIGUBxV:w9b9YMtAyQmqnEJY@cluster0.9cfel.mongodb.net/pokemons?retryWrites=true&w=majority";
let cachedDB = null;

module.exports = {
  connect:() => {
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
}
