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
                "register error": "registration unsuccessful"
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
        console.log(response + "hellohello");
        if (response) {
            console.log(req.body.password + " " + response.password)
            bcrypt.compare(req.body.password, response.password, function(err, responseBcrypt) {
                if (responseBcrypt) {
                    // Passwords match
                    console.log("password is correct");
                    jwt.sign({
                        username: response.username
                    }, config.secretKey, {
                        algorithm: 'HS256'
                    }, function(err, token) {
                        console.log(token);
                        console.log(err);
                        res.json({
                            "token": token
                        });
                    });
                } else {

                    console.log("password is incorrect");
                    res.json({
                        "login error": "username or password incorrect"
                    });
                    // Passwords don't match
                }
            });
        } else {
            console.log(err);
            console.log("username incorrect");
            res.json({
                "login error": "username or passwor incorrect"
            });
        }
    });
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