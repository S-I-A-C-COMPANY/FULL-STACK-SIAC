const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { registerProduct, deleteProduct, getProduct, updateProduct,allProduct, imgProduct} = require("../controllers/productsController")
const router = express.Router()

//registar un producto
router.post('/register-products', protect, registerProduct)
//traer un producto
router.get('/get-product/', getProduct)


//traer todos productos
router.get('/all-product',protect, allProduct)



//actualizr un producto
router.put('/update-product/:id',protect,updateProduct )
//borrar un producto
router.delete('/delete-products/:id', protect, deleteProduct)
router.post('/uploadImg',protect, imgProduct)



module.exports = router