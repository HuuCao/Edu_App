const jwt = require("jsonwebtoken");
const key = require("./key");

const sign = (user) => {
	delete user.password;
	const payload = {
		...user
	};

	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				...payload,
				exp: Math.floor(Date.now() / 1000) + 24 * 36000000,
			},
			key.PRIVATEKEY,
			{ algorithm: "RS256" },
			(error, encoded) => {
				if (error) return reject(error);
				return resolve(encoded);
			}
		);
	});
};

const signRefresh=(user)=>{
	delete user.password;
	const payload = {
		...user
	};
	return new Promise((resolve, reject) => {
		jwt.sign(
			{
				...payload,
				exp: Math.floor(Date.now() / 1000) + 48 * 60,
			},
			key.PRIVATEKEY,
			{ algorithm: "RS256" },
			(error, encoded) => {
				if (error) return reject(error);
				return resolve(encoded);
			}
		);
	});
}

const verify = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, key.PRIVATEKEY, { algorithms: "RS256" }, (error, decoded) => {
			if (error) return reject(error);
			return resolve(decoded);
		});
	});
};

module.exports = {
	sign,
	verify,
	signRefresh
};
