module.exports = {
	"dburi":"mongodb://agriconnectagnishardul:finalyearproject@"+
		   "agriconnect-shard-00-00-a7ggl.mongodb.net:27017,"+
		   "agriconnect-shard-00-01-a7ggl.mongodb.net:27017,"+
		   "agriconnect-shard-00-02-a7ggl.mongodb.net:27017/agriconnectdb01?"+
		   "ssl=true&replicaSet=agriconnect-shard-0&authSource=admin",
	"database":"",
	"dbusername":"agriconnectagnishardul",
	"dbpassword":"finalyearproject",
	"port":process.env.PORT || 3001,
	"secretkey":"agriconnectsecret"
}



