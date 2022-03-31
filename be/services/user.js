const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");

module.exports.updateUser = async (req, res, next) => {
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

module.exports.getUser = async (req, res, next) => {
  try {
    var user = await client.db(process.env.DB).collection("user").findOne({
      idUser: req.user.idUser,
    });
    
    await new Promise(async(resolve, reject) => {
      for(let i in user.history){
        let lesson = await client
        .db(process.env.DB)
        .collection('lesson')
        .findOne({ lessonID: parseInt(user.history[i]) })
        user.history[i].lessonID = lesson;
      }
      resolve();  
    })

    res.send({ success: true, data: user });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getUserByRole = async (req, res, next) => {
  try {
    var role = await client
      .db(process.env.DB)
      .collection("user")
      .find({
        role: req.query.role,
      })
      .toArray();

    res.send({ success: true, data: role });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};