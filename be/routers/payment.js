const router = require('express').Router();
const {
    getAllPayment,
    updatePayment
} = require('../controllers/payment');
const {auth} = require("../middleware/auth");

router.route('/').get(auth(),getAllPayment);
router.route('/updatepayment').post(auth(),updatePayment)


module.exports = router;