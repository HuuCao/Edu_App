const router = require('express').Router();
const {
    register,
    login,
    sendmail,
    changepass,
    verifyotp,
    active,
    getProfile
} = require('../controllers/auth');
const {auth} = require('../middleware/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/sendmail').post(sendmail);

router.route('/changepass').post(changepass);

router.route('/verifyotp').post(verifyotp);

router.route('/active').post(active);

router.route('/profile').get(auth(),getProfile);

module.exports = router;