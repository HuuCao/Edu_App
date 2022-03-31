const jwt = require("../config/jwt");

module.exports.auth = () => async (req, res, next) => {
	const { headers } = req;
	const token = headers.authorization ? headers.authorization.replace("Viesoftware ","") : null;
	if (!token) {
		throw next(new Error("401:Forbiden"));
	}
	let payload;
	try {
		payload = await jwt.verify(token);
		req.user = payload;
		next();
	} catch (error) {
		throw next(new Error("401:Forbiden"));
	}
};
