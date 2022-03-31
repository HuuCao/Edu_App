const router = require('express').Router();
const {
    getAllQuestion,
    insertQuestion,
    getQuestionByExamID,
    updateQuestion
} = require('../controllers/question');
const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getAllQuestion);
router.route('/insertquestion').post(auth(),insertQuestion);
router.route('/updatequestion').patch(auth(),updateQuestion);

module.exports = router;
