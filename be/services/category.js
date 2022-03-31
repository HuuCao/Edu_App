const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");

module.exports.getAllCategory = async (req, res, next) => {
  try {
    var category = await client
      .db(process.env.DB)
      .collection("category")
      .find({})
      .toArray();

    res.send({ success: true, data: category });
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.insertCategory = async (req, res, next) => {
  req.body.idCategory =
    (await client.db(process.env.DB).collection("category").countDocuments()) +
    1;

  await client
    .db(process.env.DB)
    .collection("category")
    .insert(req.body)
    .then((result) => {
      if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" });
      }
    });
};
