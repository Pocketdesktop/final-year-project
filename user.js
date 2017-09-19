var MongoClient = require('mongodb').MongoClient;
var dbconnection = require('./dbconnection');


module.exports = {
    adduser(userdata, callback) {
        var db = dbconnection.getDb();
        console.log(userdata);
        db.collection('users').insertOne(userdata, function(err, response) {
            if (err)
                console.log(err);
            else
                console.log("user added succesfully");
        });
    }
};


module.exports = {
    getuser(username, callback) {
        var db = dbconnection.getDb();
        console.log(username);
        db.collection('users').find({
                "username": username
            }).toArray()
            .then(function(items) {
                //console.log(items);
                callback(items);
            });
    }
};