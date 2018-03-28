var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
var jwt = require('jsonwebtoken');
var config = require('./config');
var bcrypt = require('bcrypt');
var authenticate = require('./authentications');
var reply = require('./reply');

router.use(bodyParser.urlencoded({
    extended: true
}));


router.post('/queryreply',authenticate.isAuthenticated, function(req, res) {
    //console.log(req.body);
    reply.addQueryReply(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "query reply error": "unsuccessful"
            });
        } else {
            res.json({
                "query reply": "successful",
                "result":result
            });
        }
    });
});


router.post('/getqueryreply', function(req, res) {
    //console.log(req.body);
    reply.getQueryReply(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "sucess": false
            });
        } else {
            res.json({
                "sucess":true,
                "reply_list": result
            });
        }
    });
});

router.post('/queryreplydelete',authenticate.isAuthenticated, function(req, res) {
    //console.log(req.body);
    reply.deleteQueryReply(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "query reply delete error": "unsuccessful"
            });
        } else {
            res.json({
                "query reply delete": "successful"
            });
        }
    });
});



router.post('/answerreply',authenticate.isAuthenticated, function(req, res) {
    //console.log(req.body);
    reply.addAnswerReply(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "answer reply error": "unsuccessful"
            });
        } else {
            res.json({
                "answer reply": "successful",
                "result":result
            });
        }
    });
});


router.post('/getanswerreply', function(req, res) {
    //console.log(req.body);
    reply.getAnswerReply(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "sucess": false
            });
        } else {
            res.json({
                "sucess":true,
                "reply_list": result
            });
        }
    });
});

router.post('/answerreplydelete',authenticate.isAuthenticated, function(req, res) {
    console.log(req.body);
    reply.deleteAnswerReply(req, function(err, result) {
        if (err) {
            console.log(err);
            res.json({
                "answer reply delete error": "unsuccessful"
            });
        } else {
            res.json({
                "answer reply delete": "successful"
            });
        }
    });
});






module.exports = router;