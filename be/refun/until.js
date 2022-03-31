const moment = require("moment");
const validate = (current, fields) => {
	var object = {};
	Object.keys(current).map((cur) => {
		if (fields.includes(cur) == true && current[cur] != undefined) {
			object[cur] = current[cur];
		}
	});
	return Object.keys(object).length == fields.length ? object : false;
};

const validate_v2 = (current, fields) => {
	var object = {};
	Object.keys(current).map((cur) => {
		if (fields.includes(cur) == true && current[cur] != undefined) {
			object[cur] = current[cur];
		}
	});
	return object;
};

const findEleDB = 
async (client, db, collection, fields, value) => {
	var result = false;
	var filter = {};
	filter[`${fields}`] = value;
	var data = await client.db(db).collection(collection).findOne(filter);
	return data;
};

const sendNotif = async (client, io, sender, received, title, des) => {
	

	for(var i =0 ; i < received.length;i++)
	{
		await client.db(process.env.DB).collection("news").insertOne({
			idUserReceive: received[i],
			titleNew: title,
			descriptionNew: des,
			idUserCreated: sender,
			createdDate: moment().format("YYYY MM dd"),
			isSeen:0
		});
			io.emit(
				received[i]+"_new",
				JSON.stringify({
					category: "news",
					titleNew: title,
					descriptionNew: des,
					createdDate: moment().format("YYYY MM dd"),
					isSeen:0
				})
			);
	}
};

module.exports = {
	validate,
	findEleDB,
	validate_v2,
	sendNotif,
};
