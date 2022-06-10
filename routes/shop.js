const express = require('express')
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')
const adminData = require('../routes/admin')
const productController = require('../controller/product')

router.get('/',productController.getProducts)

router.get('/products/:id',productController.getProduct)

module.exports = router;