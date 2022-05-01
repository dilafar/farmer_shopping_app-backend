const router = require('express').Router();
const {signin , signup, getAllUsers , updateUser ,deleteUser} = require('../controller/user');


router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/').get(getAllUsers);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);



module.exports = router;