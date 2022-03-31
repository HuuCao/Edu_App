const { validate } = require('../refun/until');
const { questionVal, practiceVal } = require('../refun/validate');
const {
    getPracticeByLessonID,
    insertPractice
} = require('../services/practice');


module.exports.getPracticeByLessonID = async (req, res, next) => {
    try {
        getPracticeByLessonID(req, res, next);
    } catch (e) {
        return res.send({ success: false, mess: "Error: " + e });
    }
};

module.exports.insertPractice = async (req, res, next) => {
    try {
      var valPractice = validate(req.body ,practiceVal)
  
      if(valPractice == undefined) {
          res.send({ success: false, mess: "Vui lòng nhập đầy đủ thông tin" })
      }
      req.valPractice = valPractice;
      await insertPractice(req, res, next);
    }
    catch (e) {
      return res.send({ success: false, mess: "Error: " + e });
    }
  }