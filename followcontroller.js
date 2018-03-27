var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
var config = require('./config');
var bcrypt = require('bcrypt');
var authenticate = require('./authentications');
var follow = require('./follow');

router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/queryfollow',authenticate.isAuthenticated, function(req, res) {
    //console.log(req.body);
    follow.queryFollow(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "query follow error": "unsuccessful"
            });
        } else {
            res.json({
                "query follow": "successful"
            });
        }
    });
});




module.exports = router;