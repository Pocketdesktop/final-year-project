var MongoClient = require('mongodb').MongoClient;
var dbConnection = require('./dbconnection');
var bcrypt = require('bcrypt');
var path = require('path');
var utilities = require('./utilities');


module.exports = {
    addUser(userData, callback) {

        this.userExists(userData.username,function(replycode)
        {
            if(replycode)
            {
                callback(1,0);

            }
            else
            {
                var db = dbConnection.getDb();
                userData["query_follow"] = [];
                userData["user_follow"] = [];
                userData["followed_by"] = [];
                if(userData.role == "Farmer")
                {
                 console.log("i am a farmer");
                userData["verified"] = 1;
                }
                else
                {
                    userData["verified"] = 0;
                }
                var plainPassword = userData.password;
                bcrypt.hash(plainPassword,10, function(err, hash) {
                if (err) {
                    console.log(err);
                    callback(err, hash);
                } else {
                    console.log(hash + "this is password hash");
                    userData.password = hash;
                    console.log(userData + "\nthis is another hash");
                    db.collection('users').insertOne(userData, function(err, response) {
                        if (err)
                            console.log(err);
                        else
                            console.log("user added succesfully");
                });
                callback(err, hash);
            }
        });    
            }

        });
        
    },


    //module.exports = {
    getUser(username, callback) {
        var db = dbConnection.getDb();
        console.log(username);
        /*  db.collection('users').find({
                  "username": username
              }).toArray()
              .then(function(items) {
                  console.log("items= "+items);
                  callback(items);
              });
              */
        db.collection('users').findOne({
            "username": username
        }, function(err, result) {
            console.log(err + " error");
            console.log("result " + result);
            callback(err, result);
        });
    },

uploadPic(req, callback) {
        if(req.files)
        {
           //console.log(req.files);
        }
        var user=utilities.getToken(req).username; 
        var query={"username":user};
        let sampleFile = req.files.file;

        db.collection('users').findOne(query, function(err, result) {
            console.log(err + " error");
            console.log("result " + result);
            callback(err, result);
            sampleFile.mv('./image/'+user+'.png', function(err) {
              if(err)
              {

              }
              result.pic='./image/'+user+'.png';

         db.collection("feeds").updateOne(query, result, function(err, res) {
                    //console.log(err+"hdhdh");
                     callback(err,result);
                });


          });
        });
         
          // Use the mv() method to place the file somewhere on your server
          
    },

    userExists(username, callback) {
        var db = dbConnection.getDb();
        db.collection('users').findOne({
            "username": username
        }, function(err, response) {
            if (err) {
                console.log(err);
                callback(2);
            } else {
                if (response) {
                    callback(1);
                } else {
                    callback(0);
                }
            }
        });
    }


};