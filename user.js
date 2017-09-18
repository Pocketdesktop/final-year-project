var MongoClient = require('mongodb').MongoClient;
var dbconnection = require( './dbconnection' );


module.exports = {

	adduser: function(userdata,callback){
		var db = dbconnection.getDb();


	console.log(userdata);
	db.collection('users').insertOne(userdata,function(err,response){
		if(err)
			console.log(err);
		else
			console.log("user added succesfully");
	});

}






};


module.exports = {
		getuser: function(username,callback){
		var db = dbconnection.getDb();
	console.log(username);
	var cursor  = db.collection('users').find({"username":username});

return cursor;
/*
	cursor.forEach(function(doc){
		console.log(doc);
	})
*/

     

	//console.log(b);


}


};