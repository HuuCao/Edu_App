const router = require('express').Router();
const {
    createExam,
    getAllExam,
    addQuestion
} = require('../controllers/exam');
const {auth} = require("../middleware/auth");

router.route('/createexam').post(auth(),createExam);
router.route('/').get(auth(),getAllExam);
router.route('/addquestion').post(auth(), addQuestion);

module.exports = router;