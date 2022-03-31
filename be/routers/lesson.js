const router = require('express').Router();
const {
    getLesson,
    insertLessonBySubjectID,
    getLessonDetailsByLessonID,
    updateLesson,
    addQuestion
} = require('../controllers/lesson');

const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getLesson);
router.route('/insertlesson').post(auth(),insertLessonBySubjectID);
router.route('/addquestion').post(auth(),addQuestion);
router.route('/getlessondetail').get(auth(),getLessonDetailsByLessonID);
router.route('/updatelesson').post(auth(),updateLesson);


module.exports = router;