const router = require('express').Router();
const {signin , signup} = require('../controller/user');


router.route('/signin').post(signin);
router.route('/signup').post(signup);


module.exports = router;