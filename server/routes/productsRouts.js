const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const { registerProduct, deleteProduct, getProduct, updateProduct,allProduct, imgProduct} = require("../controllers/productsController")
const router = express.Router()

//registar un producto
router.post('/register-products', registerProduct)
//traer productos especificos categoria
router.get('/all/:name', getProduct)


//traer todos productos
// router.get('/all-product', allProduct)


//actualizr un producto
router.put('/update-product/:id',protect,updateProduct )
//borrar un producto
router.delete('/delete-products/:id', protect, deleteProduct)
router.post('/uploadImg',protect, imgProduct)



module.exports = router