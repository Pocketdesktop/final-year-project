var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var user = require('./user');
var config = require('./config');
var bcrypt = require('bcrypt');
var authenticate = require('./authentications');
var notification = require('./notification');
var utilities = require('./utilities');
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/getallnotification',authenticate.isAuthenticated, function(req, res) {

    notification.getAllNotification(req, function(result) {
      
            
            data=[]
            user=utilities.getToken(req).username;
            for(var i=0;i<result.length;i++)
            {
            	if(result[i].user!=user)
            	{
            		data.push(result[i])
            	}
            	console.log(result[i].user);
            }
            res.json({
                "result": data
            });
      
    });
});

router.post('/getnotificationcount',authenticate.isAuthenticated, function(req, res) {

    notification.getNotificationCount(req, function(result) {
      
           
            res.json({
                "result": result
            });
      
    });
});

module.exports = router;