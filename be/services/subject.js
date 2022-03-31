const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");
const _ = require("lodash");

// module.exports.updateSubjectByID = async (req, res, next) => {
//   try {
//     client
//       .db(process.env.DB)
//       .collection("subject")
//       .updateOne(
//         {
//           idSubject: parseInt(req.params.id),
//         },
//         {
//           $set: {
//             ...req.body,
//           },
//         }
//       )
//       .then((result) => {
//         if (result.matchedCount > 0) {
//           res.send({ success: true, mess: "Update Success !" });
//         } else {
//           res.send({ success: false, mess: "Update Faile !" });
//         }
//       });
//   } catch (e) {
//     res.send({ success: false, mess: "Erro: " + e });
//   }
// };

module.exports.getAllSubject = async (req, res, next) => {
  try {
    var subject = await client
      .db(process.env.DB)
      .collection("subject")
      .find({})
      .toArray();

      if (req.query.classID != undefined) {
        subject = _.filter(subject, (o) => {
          if (o.classID == req.query.classID) return o;
        });
      }

    res.send({ success: true, data: subject });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};


module.exports.insertSubject = async (req, res, next) => {
  req.valSubject.subjectID = await client
      .db(process.env.DB)
      .collection('subject')
      .countDocuments() + 1
  
  
  await client
      .db(process.env.DB)
      .collection('subject')
      .insert(req.valSubject)
      .then((result) => {
  if (result.insertedIds != null) {
      return res.send({ success: true, mess: "Successfully" })
  }
  });
  }