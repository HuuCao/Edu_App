const router = require('express').Router();
const {
    getAllChapterBySubjectID,
    insertChapterBySubjectID
} = require('../controllers/chapter');

const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getAllChapterBySubjectID);
router.route('/insertchapter').post(auth(),insertChapterBySubjectID);

module.exports = router;