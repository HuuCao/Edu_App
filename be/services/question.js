const client = require("../config/mongodb");
const _ = require("lodash");
const filter = require(`../utils/filter`);

module.exports.getAllQuestion = async (req, res, next) => {
    try {
      var question = await client
        .db(process.env.DB)
        .collection("question")
        .find({active: true})
        .toArray();

      if (req.query.subjectID != undefined) {
        question = _.filter(question, (o) => {
          if (o.subjectID == req.query.subjectID) return o;
        });
      }
      if (req.query.classID != undefined) {
        question = _.filter(question, (o) => {
          if (o.classID == req.query.classID) return o;
        });
      }
      if (req.query.lessonID != undefined) {
        question = _.filter(question, (o) => {
          if (o.lessonID == req.query.lessonID) return o;
        });
      }
      if (req.query.chapterID != undefined) {
        question = _.filter(question, (o) => {
          if (o.chapterID == req.query.chapterID) return o;
        });
      }

      if (req.query.keyword) {
        question = filter.keyword(req.query.keyword, question);
        delete req.query.keyword;
      }
      if (req.query) question = filter.relative(req.query, question);
  
      res.send({ success: true, data: question });
    } catch (e) {
      res.send({ success: false, mess: "Error: " + e });
    }
  };

module.exports.insertQuestion = async (req, res, next) => {
  await client
    .db(process.env.DB)
    .collection('question')
    .insertMany(req.valQuestion)
    .then((result) => {
      if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" })
      }
    });
}

module.exports.updateQuestion = async (req, res, next) => {
  try {
    await client
      .db(process.env.DB)
      .collection('question')
      .updateOne(
        {
          questionID: parseInt(req.query.questionID),
        },
        {
          $set: {
            ...req.body,
          },
        }
      )
      .then((result) => {
        return res.send({ success: true, data: req.body });
      });
  } catch (err) {
    return res.status(402).send({ success: false, mess: err });
  }
};