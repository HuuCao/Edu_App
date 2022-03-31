const {
    createExam,
    getAllExam,
    getExamBySubjectClass
} = require('../services/exam');
const client = require('../config/mongodb')

const { validate } = require('../refun/until');
const { examVal } = require('../refun/validate');
const { query } = require('express');
const { reject } = require('lodash');
const moment = require('moment');

module.exports.createExam = async (req, res, next) => {
  try {
    var valExam = validate(req.body ,examVal)

    if(valExam == undefined) {
        res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
    }
    req.valExam = valExam;
    req.valExam.lstQuestion = [];
    req.valExam.createAt = moment().format('DD/MM/YYYY');

    await createExam(req, res, next);
  }
  catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
}

module.exports.getAllExam = async (req, res, next) => {
  try {
    getAllExam(req, res, next);
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};


module.exports.addQuestion = async (req, res, next) => {
  try {
      var exam = await client
          .db(process.env.DB)
          .collection("exam")
          .findOne({
              examID: parseInt(req.query.examID),
          });
      
      await new Promise(async(resolve, reject) => {
        for(let i in req.body.lstQuestion){
          var question = await client
          .db(process.env.DB)
          .collection("question")
          .findOne({
            questionID : typeof req.body.lstQuestion[i] === 'number' ? parseInt(req.body.lstQuestion[i]) : parseInt(req.body.lstQuestion[i].questionID)
            // questionID: parseInt(req.body.lstQuestion[i])
          });
          // req.body.lstQuestion[i] = question
          req.body.lstQuestion[i] =typeof req.body.lstQuestion[i]==='number' ?  question :  {
            ...question,
            answer: req.body.lstQuestion[i].answer, 
            correct: req.body.lstQuestion[i].correct
          } 
        }
        resolve();
      })
      
      

      await client
          .db(process.env.DB)
          .collection("exam")
          .findOneAndUpdate(
              {
                examID: parseInt(req.query.examID),
              },
              {
                $set: {
                  ...req.body
                },
              }
          )
      exam = await client
        .db(process.env.DB)
        .collection("exam")
        .findOne({
            examID: parseInt(req.query.examID),
        });
      res.send({ success: true, data: exam })

  } catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
  }
};
// module.exports.getExamBySubjectClass = async (req, res, next) => {
//   try {
//     getExamBySubjectClass(req, res, next)
//   }
//   catch (e) {
//       return res.send({ success: false, mess: "Error:" + e });
//   }
// }
