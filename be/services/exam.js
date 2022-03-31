const client = require("../config/mongodb");
const _ = require("lodash");

module.exports.createExam = async (req, res, next) => {
  req.valExam.examID =
    (await client.db(process.env.DB).collection("exam").countDocuments()) + 1;

  // Hanlde idCategory

  // var lstQuestion = await client
  //   .db(process.env.DB)
  //   .collection("question")
  //   .find({})
  //   .toArray();
  // req.valExam.lstQuestion = lstQuestion;
  var subject = await client
  .db(process.env.DB)
  .collection("subject")
  .findOne({
    subjectID: parseInt(req.body.subjectID)
  });

  await client
    .db(process.env.DB)
    .collection("exam")
    .insert({...req.valExam, subjectName: subject.subjectName})
    .then((result) => {
      if (result.insertedIds != null) {
        return res.send({ success: true, data: {...req.valExam, subjectName: subject.subjectName}});
      }
    });
};

module.exports.getAllExam = async (req, res, next) => {
  try {
    var exam = await client
      .db(process.env.DB)
      .collection("exam")
      .find({})
      .toArray();

    exam = _.reverse(exam);

    if (req.query.subjectID != undefined) {
      exam = _.filter(exam, (o) => {
        if (o.subjectID == req.query.subjectID) return o;
      });
    }
    if (req.query.classID != undefined) {
      exam = _.filter(exam, (o) => {
        if (o.classID == req.query.classID) return o;
      });
    }
    if (req.query.examID != undefined) {
      exam = _.filter(exam, (o) => {
        if (o.examID == req.query.examID) return o;
      });
    }

    res.send({ success: true, data: exam });

    // result = _.filter(result, (o) => {
    //   if (o.subjectID == req.query.subjectID)
    //     return o;
    // });
    // res.send({ success: true, data: result });
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

// module.exports.getExamBySubjectClass = async (req, res, next) => {
//   try {
//       var exam = await client
//           .db(process.env.DB)
//           .collection('exam')
//           .find({
//             subjectID: parseInt(req.query.subjectID),
//             classID: parseInt(req.query.classID)
//           })
//           .toArray();

//           res.send({ success: true, data: exam });
//   }catch(e) {
//       return res.send({ success: false, mess: "Error: " + e })
//   }
// }

