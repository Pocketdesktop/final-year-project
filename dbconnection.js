var MongoClient = require('mongodb').MongoClient;
var config = require('./config');
var _db;

module.exports = {
    connectToServer: function(callback) {
        MongoClient.connect(config.dburi, function(err, db) {
            _db = db;
            //    console.log(db);
            //   console.log(err);
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    }

};




// use this code in modules other than index.js/server.js
/*
var mongoUtil = require( 'mongoUtil' );
var db = mongoUtil.getDb();

db.collection( 'users' ).find();*/