const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

router.get('/', productController.list);
router.get('/:id', productController.get);

// Admin CRUD
router.post('/', auth.protect, auth.admin, productController.create);
router.put('/:id', auth.protect, auth.admin, productController.update);
router.delete('/:id', auth.protect, auth.admin, productController.remove);

module.exports = router;
