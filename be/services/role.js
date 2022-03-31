const client = require("../config/mongodb");

//=================== updateRole ===================//

module.exports.updateRole = async (req, res, next) => {
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
          res.send({ success: false, mess: "Update Fail !" });
        }
      });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};