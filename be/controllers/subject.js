const { validate } = require('../refun/until');
const {
    getAllSubject,
    insertSubject
    // updateSubjectByID
} = require('../services/subject');
const { subjectVal } = require("../refun/validate");


// module.exports.updateSubject = async (req, res, next) => {
//   try {
//     var user = await client
//       .db(process.env.DB)
//       .collection("user")
//       .findOne({
//         idUser: parseInt(req.params.id),
//       });

//     if (!user)
//       return res.status(401).send({ success: false, mess: "Not Found User" });

//     updateUser(req, res, next);
//   } catch (e) {
//     return res.send({ success: false, mess: "Erro: " + e });
//   }
// };

module.exports.getAllSubject = async (req, res, next) => {
  try {
    getAllSubject(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.insertSubject = async (req, res, next) => {
  try {
      var valSubject = validate(req.body, subjectVal);

      if (valSubject == undefined) {
          res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
      }

      req.valSubject = valSubject;
      req.valSubject.is_active = true;

      await insertSubject (req, res, next);
  }
  catch (e) {
      res.send({ success: false, mess: "Error: " + e });
  }
}