const router = require('express').Router();
const {
    getPracticeByLessonID,
    insertPractice
} = require('../controllers/practice');
const {auth} = require("../middleware/auth");


router.route('/getpractice').get(auth(),getPracticeByLessonID);
router.route('/insertpractice').post(auth(),insertPractice);


module.exports = router;