const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = async (pass) => {
	var result = "";
	await bcrypt.hash(pass, saltRounds).then(res=>{
		result = res;
	}).catch(e=>{
		console.log(e);
	});
	return result;
};



const compare = async (pass, hash) => {
	var result = false;
	await bcrypt.compare(pass, hash).then(res=>{
		result = res;
	}).catch(e=>{
		console.log(e);
	});;
	return result;
};

module.exports = {
	hash,
	compare,
};
