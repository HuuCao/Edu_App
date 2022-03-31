const { getAllCategory, insertCategory } = require("../services/category");

const { categoryVal } = require("../refun/validate");
const client = require("../config/mongodb");
const { validate } = require("../refun/until");

module.exports.getAllCategory = async (req, res, next) => {
  try {
    getAllCategory(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error:" + e });
  }
};

module.exports.insertCategory = async (req, res, next) => {
  try {
    valCategory = validate(req.body, categoryVal);

    if (valCategory == false) {
      res.send({ success: false, mess: "Validate Wrong" });
    }

    await insertCategory(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};
