const { sign, signRefresh } = require("../config/jwt");
const client = require("../config/mongodb");
const { loginVal } = require("../refun/validate");
const bcrypt = require("../config/bcrypt");

module.exports.getAllChapterBySubjectID = async (req, res, next) => {
  try {
    var chapter = await client
      .db(process.env.DB)
      .collection("chapter")
      .find({
        subjectID: parseInt(req.query.subjectID),
      })
      .toArray();

    var lessons = await client
      .db(process.env.DB)
      .collection("lesson")
      .find({})
      .toArray();

    for (var i = 0; i < chapter.length; i++) {
      chapter[i].lstLesson = [];
      for (var j = 0; j < lessons.length; j++) {
        if (lessons[j].chapterID == chapter[i].chapterID)
          chapter[i].lstLesson.push(lessons[j]);
      }
    }

    res.send({ success: true, data: chapter });
  } catch (e) {
    return res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.insertChapterBySubjectID = async (req, res, next) => {
  req.valChapter.chapterID =
    await client
      .db(process.env.DB)
      .collection("chapter")
      .countDocuments() + 1;

  await client
    .db(process.env.DB)
    .collection("chapter")
    .insert(req.valChapter)
    .then((result) => {
      if (result.insertedIds != null) {
        return res.send({ success: true, mess: "Successfully" });
      }
    });
};
