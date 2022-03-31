const { ObjectID } = require("mongodb");
const client = require("../config/mongodb");
const _ = require("lodash");

module.exports.getAllByUserID = async (req, res, next) => {
  try {

    var point = await client
      .db(process.env.DB)
      .collection("point")
      .find({idUser: req.user.idUser})
      .toArray();

      if (req.query.semester != undefined) {
        point = _.filter(point, (o) => {
          if (o.semester == req.query.semester) return o;
        });
      }

    res.send({ success: true, data: point});
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.updatePoint = async (req, res, next) => {
  try {
    for (var i = 0; i < req.body.data.length; i++) {
      if (req.body.data[i]._id == undefined) {
        return res.send({ success: false, mess: "Cấu trúc không đúng !" });
      }
      var _id = new ObjectID(req.body.data[i]._id);
      delete req.body.data[i]._id;

      await client
        .db(process.env.DB)
        .collection("point")
        .updateOne(
          {
            _id: _id,
          },
          {
            $set: {
              ...req.body.data[i],
            },
          }
        );
    }

    
    var point = await client
      .db(process.env.DB)
      .collection("point")
      .find({ idUser: req.user.idUser })
      .toArray();

    res.send({ success: true, data: point });
  } catch (e) {
    return res.send({ success: false, mess: "Error " + e });
  }
};
