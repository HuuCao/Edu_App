const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");

module.exports.getLesson = async (req, res, next) => {
    try {
        var lesson = await client
            .db(process.env.DB)
            .collection('lesson')
            .find({
                chapterID: parseInt(req.query.chapterID)
            })
            .toArray();

            res.send({ success: true, data: lesson });
    }catch (e) {
        return res.send({ success: false, mess: "Error: " + e })
    }
}

module.exports.insertLessonBySubjectID = async (req, res, next) => {
req.valLesson.lessonID = await client
    .db(process.env.DB)
    .collection('lesson')
    .countDocuments() + 1


await client
    .db(process.env.DB)
    .collection('lesson')
    .insert(req.valLesson)
    .then((result) => {
if (result.insertedIds != null) {
    return res.send({ success: true, mess: "Successfully" })
}
});
}

module.exports.getLessonDetailsByLessonID = async (req, res, next) => {
try {
    var lessondetails = await client
    .db(process.env.DB)
    .collection('lesson')
    .find({  lessonID: parseInt(req.query.lessonID) })
    .toArray();

    res.send({ success: true, data: lessondetails });
}
catch(e){
    res.send({ success: false, mess: "Error: " + e});
}
}

module.exports.updateLesson = async (req, res, next) => {
    try {
      await client
        .db(process.env.DB)
        .collection('lesson')
        .updateOne(
          {
            lessonID: parseInt(req.query.lessonID),
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