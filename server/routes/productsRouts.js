const express = require("express")

const { registerProduct, deleteProduct, getProduct, updateProduct,allProduct, imgProduct} = require("../controllers/productsController")
const router = express.Router()

//registar un producto
router.post('/register-products', registerProduct)
//traer un producto
router.get('/get-product/', getProduct)


//traer todos productos
router.get('/all-product',allProduct)



//actualizr un producto
router.put('/update-product/:id',updateProduct )
//borrar un producto
router.delete('/delete-products/:id', deleteProduct)
router.post('/uploadImg', imgProduct)



module.exports = router