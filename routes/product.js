const express = require('express');
const productRouter = express.Router();

const productController = require('../controller/product');

productRouter.get('/products', productController.index)

productRouter.get('/products/:brand', productController.sort)

productRouter.get('/detail/:name', productController.detail)

productRouter.get('/search', productController.search)

module.exports = productRouter;