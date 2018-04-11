var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
var jwt = require('jsonwebtoken');
var config = require('./config');
var bcrypt = require('bcrypt');
var authenticate = require('./authentications');

router.use(bodyParser.urlencoded({
    extended: true
}));



router.post('/register', function(req, res) {
    console.log(req.body);
    user.addUser(req.body, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "register": "registration unsuccessful"
            });
        } else {
             jwt.sign({
                        username: req.body.username
                    }, config.secretKey, {
                        algorithm: 'HS256'
                    }, function(err, token) {
                        console.log(token);
                        console.log(err);
                        res.json({
                            "username":req.body.username,
                            "token": token
                        });
                    });
           
        }
    });
});


router.get('/userexists', function(req, res) {
    console.log(req.query.test);
    user.userExists(req.query.test, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "userExists": "username already taken"
            });
        } else {
            res.json({
                "userExists": "you are good to go with this username"
            });
        }
    });
});


router.post('/login', function(req, res) {
    // console.log(req.body);
    user.getUser(req.body.username, function(err, response) {
        console.log(req.body);
        console.log(response + "hellohello");
        if(response.verified == 0)
        {
            console.log("account not verified");
             res.json({
                        "login_error": "account not verfied"
                    });

        }
        else if (response) {
            console.log(req.body.password + " " + response.password)
            bcrypt.compare(req.body.password, response.password, function(err, responseBcrypt) {
                if (responseBcrypt) {
                    // Passwords match
                    console.log("password is correct");
                    jwt.sign({
                        username: response.username,
                        role: response.role
                    }, config.secretKey, {
                        algorithm: 'HS256'
                    }, function(err, token) {
                        console.log(response.username);
                        console.log(response._id);
                        var id = response._id;
                        res.json({
                            "token": token,
                            "username": response.username,
                            "id":id,
                            "role":response.role
                        });
                    });
                } else {

                    console.log("password is incorrect");
                    res.json({
                        "login_error": "username or password incorrect"
                    });
                    // Passwords don't match
                }
            });
        } else {
            console.log(err);
            console.log("username incorrect");
            res.json({
                "login_error": "username or passwor incorrect"
            });
        }
    });
});

router.get('/getuserdata', authenticate.isAuthenticated,function(req,res)
{
   user.getUser(req, function(err, response) {
    res.json(response);

   });

});

router.post('/uploadpic',function(req,res)
{
    //console.log(req);
    user.uploadPic(req, function(err, response) {
        res.json(response);

   });

});

router.get('/profilepic',function(req,res)
{
    //console.log(req);
    var image=req.query.profilepic;
    res.sendfile('./image/'+image);

});

router.get('/hello', authenticate.isAuthenticated, function(req, res) {
    // console.log(req.body);
    var token = req.headers.authorization.replace('bearer ', '');
    var decoded = jwt.decode(token);
    console.log("token verified and all");
    res.json({
        "username": decoded.username
    });
});


module.exports = router;