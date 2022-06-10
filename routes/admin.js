const express = require('express')
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')
const productController = require('../controller/product')




router.get('/add-product',productController.getAddProduct)

router.post('/add-product',productController.postAddProduct)

router.get('/edit-product/:id',productController.getEditProduct)

router.post('/edit-product', productController.getpostEditProduct)

router.post('/delete-product', productController.postDeleteProduct)

module.exports = router;


