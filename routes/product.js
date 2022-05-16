const router = require('express').Router();
const {getAllProduct , createProduct ,updateProduct ,deleteProduct ,getProductById} = require('../controller/product');
const auth = require('../middleware/auth');

router.route('/').get(getAllProduct);
router.route('/add').post(auth , createProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);
router.route('/:id').get(getProductById);


module.exports = router;