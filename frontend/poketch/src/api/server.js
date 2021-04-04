const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;
const MongoDB = require('./MongoDB');

const app = express();
const router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API calls
//

router.get ('/', (req, res) => {
  res.send ({ text: "You are not authorized to access this site. Please email cristoforus.darryl@gmail.com for further enquiries." });
});

router.get('/api/my-list', ( req, res ) => {

  MongoDB.connect()
  .then(client => {
    console.log('Connected to Pokemons Database');
    const db = client.db('pokemons');
    const myPokemonCol = db.collection('my-pokemon');

    myPokemonCol.find({}).toArray()
    .then ( response => {
      console.log( response );
      res.send ( response );
    })
    .catch ( error => {
      console.error ( error );
      res.status ( 500 ).end();
    });
  });


  // TODO: return list of my pokemon list
});

router.post('/api/catch', ( req, res ) => {

  MongoDB.connect()
  .then(client => {
    console.log('Connected to Pokemons Database');
    const db = client.db('pokemons');
    const myPokemonCol = db.collection('my-pokemon');

    myPokemonCol.insertOne ( req.body )
    .then ( response => {
      res.send ( "Successfully catch the pokemon" );
    })
    .catch ( error => {
      console.error ( error );
      res.send ( "Failed to catch the pokemon" );
    });
  });


  // TODO: catch pokemon and put in my pokemon list
});

router.post('/api/release', ( req, res ) => {

  MongoDB.connect()
  .then(client => {
    console.log('Connected to Pokemons Database');
    const db = client.db('pokemons');
    const myPokemonCol = db.collection('my-pokemon');

    myPokemonCol.findOneAndDelete ( { '_id': ObjectId( req.body._id ) } )
    .then ( response => {
      res.status ( 200 ).end ();
    })
    .catch ( error => {
      console.error( error );
      res.status ( 500 ).end ();
    });
  });

  // TODO: release pokemon from my pokemon list
});

app.use('/.netlify/functions/server', router);


if (process.env.NODE_ENV === 'production') {
  console.log(__dirname);

  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

module.exports = app;
module.exports.handler = serverless( app );
