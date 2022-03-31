const { validate } = require('../refun/until');
const { lessonVal, lessonDetailsVal } = require('../refun/validate');
const client = require('../config/mongodb')
const {
    getLesson,
    insertLessonBySubjectID,
    getLessonDetailsByLessonID,
    updateLesson
} = require('../services/lesson');

module.exports.getLesson = async (req, res, next) => {
    try {
        getLesson(req, res, next);
    }
    catch (e) {
        return res.send({ success: false, mess: "Error:" + e });
    }
}

module.exports.insertLessonBySubjectID = async (req, res, next) => {
    try {
        var valLesson = validate(req.body, lessonVal);

        if (valLesson == undefined) {
            res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
        }
        req.valLesson = valLesson;

        await insertLessonBySubjectID (req, res, next);
    }
    catch (e) {
        res.send({ success: false, mess: "Error: " + e });
    }
}

module.exports.getLessonDetailsByLessonID = async (req, res, next) =>  {
    try {
        getLessonDetailsByLessonID (req, res, next);
    }   
    catch(e){
        res.send({ success: false, mess: "Error: " + e });
    }
}

module.exports.updateLesson = async (req, res, next) => {
    try {
        updateLesson(req, res, next);
    } catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.addQuestion = async (req, res, next) => {
    try {
        var lesson = await client
            .db(process.env.DB)
            .collection("lesson")
            .findOne({
                lessonID: parseInt(req.query.lessonID),
            });
        
        await new Promise(async(resolve, reject) => {
          for(let i in req.body.lstQuestion){
            var question = await client
            .db(process.env.DB)
            .collection("question")
            .findOne({
              questionID: parseInt(req.body.lstQuestion[i])
            });
            req.body.lstQuestion[i] = question
          }
          resolve();
        })
        
        await client
            .db(process.env.DB)
            .collection("lesson")
            .findOneAndUpdate(
                {
                  lessonID: parseInt(req.query.lessonID),
                },
                {
                  $set: {
                    ...req.body
                  },
                }
            )
        lesson = await client
            .db(process.env.DB)
            .collection("lesson")
            .findOne({
                lessonID: parseInt(req.query.lessonID),
            });
        res.send({ success: true, data: lesson })
  
    } catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
};