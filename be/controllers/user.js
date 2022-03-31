const { loginVal, registerVal, verifyVal } = require("../refun/validate");
const { updateUser,getUser, getUserByRole } = require("../services/user");
const client = require("../config/mongodb");

module.exports.updateUser = async (req, res, next) => {
  try {
    var user = await client
      .db(process.env.DB)
      .collection("user")
      .findOne({
        idUser: parseInt(req.params.id),
      });

    if (!user)
      return res.status(401).send({ success: false, mess: "Not Found User" });

    updateUser(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getUser  = async (req, res, next) => {
  try {
    getUser(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Erro: " + e });
  }
};

module.exports.getUserByRole = async (req, res, next) => {
  try {
    getUserByRole(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};
