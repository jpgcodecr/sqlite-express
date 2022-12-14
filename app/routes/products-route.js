const express = require('express')
const productsRoutes = require('./../controllers/products-controller.js')
const router = express.Router()

// Application routes
router.get('/all', productsRoutes.productsAll)
router.get('/sum', productsRoutes.productsSum)
router.get('/:code', productsRoutes.product)
router.post('/create', productsRoutes.productsCreate)
router.put('/update', productsRoutes.productsEdit)
router.put('/delete', productsRoutes.productsDelete)
router.put('/reset', productsRoutes.productsReset)

// Export router
module.exports = router