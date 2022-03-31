const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");


//=================== updateClass ===================//

module.exports.updateClass = async (req, res, next) => {
  try {
    client
      .db(process.env.DB)
      .collection("user")
      .updateOne(
        {
          idUser: parseInt(req.params.id),
        },
        {
          $set: {
            ...req.body,
          },
        }
      )
      .then((result) => {
        if (result.matchedCount > 0) {
          res.send({ success: true, data: req.body });
        } else {
          res.send({ success: false, mess: "Update Faile !" });
        }
      });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

//=================== getAllClass ===================//

module.exports.getAllClass = async (req, res, next) => {
  try {
    var _class = await client
      .db(process.env.DB)
      .collection("class")
      .find({})
      .toArray();

    res.send({ success: true, data: _class });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};


