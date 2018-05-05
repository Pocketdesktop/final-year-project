module.exports = {
	"dbUri":"mongodb://agriconnectagnishardul:finalyearproject@"+
		   "agriconnect-shard-00-00-a7ggl.mongodb.net:27017,"+
		   "agriconnect-shard-00-01-a7ggl.mongodb.net:27017,"+
		   "agriconnect-shard-00-02-a7ggl.mongodb.net:27017/agriconnectdb01?"+
		   "ssl=true&replicaSet=agriconnect-shard-0&authSource=admin",
	"database":"",
	"dbUsername":"agriconnectagnishardul",
	"dbPassword":"finalyearproject",
	"port":process.env.PORT || 3001,
	"secretKey":"agriconnectsecret",
	"weatherapikey":"e214053af9b8f6e54b3c68c19e0aef00",
	"weatherbaseurl":"http://api.openweathermap.org/data/2.5/weather?",
	"hourlybaseurl":"http://api.openweathermap.org/data/2.5/forecast?"

}



