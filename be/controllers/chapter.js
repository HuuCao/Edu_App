const {
    getAllChapterBySubjectID,
    insertChapterBySubjectID
} = require('../services/chapter');


const { loginVal, registerVal, verifyVal, chapterVal } = require("../refun/validate");
const client = require("../config/mongodb");
const { validate } = require('../refun/until');

module.exports.getAllChapterBySubjectID = async (req, res, next) => {
    try {
        getAllChapterBySubjectID(req, res, next)
    }
    catch (e) {
        return res.send({ success: false, mess: "Error:" + e });
    }
}

module.exports.insertChapterBySubjectID = async (req, res, next) => {
    try {
        var valChapter = validate(req.body, chapterVal);

        if(valChapter == undefined) {
            res.send({ success: false, mess: "Vui lòng nhập thông tin" })
        }
        req.valChapter = valChapter;
        await insertChapterBySubjectID (req, res, next);
    }
    catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
}