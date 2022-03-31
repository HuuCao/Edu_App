const client = require("../config/mongodb");

module.exports.getPracticeByLessonID = async (req, res, next) => {
    try {
        var practice = await client
        .db(process.env.DB)
        .collection('practice')
        .find({
            classID: parseInt(req.query.classID),
            subjectID: parseInt(req.query.subjectID),
            chapterID: parseInt(req.query.chapterID),
            lessonID: parseInt(req.query.lessonID),
        })
        .toArray();

        res.send({ success: true, data: practice });
    }
    catch(e){
        res.send({ success: false, mess: "Error: " + e});
    }
}

module.exports.insertPractice = async (req, res, next) => {
    req.valPractice.practiceID = await client
      .db(process.env.DB)
      .collection('practice')
      .countDocuments() + 1;
  
    await client
      .db(process.env.DB)
      .collection('practice')
      .insert(req.valPractice)
      .then((result) => {
        if (result.insertedIds != null) {
          return res.send({ success: true, mess: "Successfully" })
        }
      });
  }