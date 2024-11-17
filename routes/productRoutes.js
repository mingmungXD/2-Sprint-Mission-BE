const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');
const router = express.Router();

router.post('/', authMiddleware, upload.array('images', 3), addProduct);
router.get('/', getProducts);

module.exports = router;