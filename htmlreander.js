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

router.get('/addarticle',function(req,res)
{
    
    res.sendFile('website/addarticle.html',{ root: __dirname });

});
router.get('/addsceme',function(req,res)
{
    
    res.sendFile('website/addscheme.html',{ root: __dirname });

});
router.get('/article',function(req,res)
{
    
    res.sendFile('website/article.html',{ root: __dirname });

});
router.get('/index',function(req,res)
{
    
    res.sendFile('website/index.html',{ root: __dirname });

});
router.get('/profile',function(req,res)
{
    
    res.sendFile('website/profile.html',{ root: __dirname });

});

router.get('/questions',function(req,res)
{
    
    res.sendFile('website/questions.html',{ root: __dirname });

});

router.get('/scheme',function(req,res)
{
    
    res.sendFile('website/scheme.html',{ root: __dirname });

});

router.get('/test',function(req,res)
{
    
    res.sendFile('website/test.html',{ root: __dirname });

});

router.get('/testangular',function(req,res)
{
    
    res.sendFile('website/testangular.html',{ root: __dirname });

});

router.get('/weather',function(req,res)
{
    
    res.sendFile('website/weather.html',{ root: __dirname });

}); 
module.exports = router;