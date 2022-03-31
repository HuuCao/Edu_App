const MongoClient = require("mongodb").MongoClient;
const uri =
	"mongodb://eduuser:abcd1234@171.244.50.146:27017/?authSource=Edu&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("DB connect Done !");
	}
});

module.exports = client;
