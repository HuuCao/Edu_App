const router = require('express').Router();
const {
    insertHistory,
    getHistoryByUserID
} = require('../controllers/history');
const {auth} = require("../middleware/auth");

router.route('/insert').patch(auth(),insertHistory);
router.route('/').get(auth(),getHistoryByUserID);

module.exports = router;