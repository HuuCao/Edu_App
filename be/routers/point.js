const router = require('express').Router();
const {
    updatePoint,
    getAllByUserID
    // mediumScore
} = require('../controllers/point');
const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getAllByUserID);
router.route('/updatepoint').post(auth(),updatePoint);
// router.route('/mediumScore').post(auth(),mediumScore);

module.exports = router;