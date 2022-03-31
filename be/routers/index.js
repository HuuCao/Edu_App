const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/class', require('./class'));
router.use('/user', require('./user'));
router.use('/subject', require('./subject'));
router.use('/chapter', require('./chapter'));
router.use('/question', require('./question'));
router.use('/lesson', require('./lesson'));
router.use('/practice', require('./practice'));
router.use('/payment', require('./payment'));
router.use('/point', require('./point'));
router.use('/exam', require('./exam'));
router.use('/blogs', require('./blogs'));
router.use('/category', require('./category'));
router.use('/feedback', require('./feedback'));
router.use('/contribute', require('./contribute'));
router.use('/history', require('./history'));
router.use('/role', require('./role'));

module.exports = router;
