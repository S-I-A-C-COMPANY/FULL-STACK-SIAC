const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { updateProducto } = require("../controllers/productsController");
const router = express.Router();

// Actualizar un producto
router.put('/update-products/:id', updateProducto,protect);

const { 
    registerProduct, 
    deleteProduct, 
    getProduct, 
    imgProduct, 
    uploadCategory, 
    allCategories, 
    delCategories} = require("../controllers/productsController")


//registar un producto
router.post('/register-products', registerProduct)
//traer productos especificos categoria
router.get('/all', getProduct)


//traer todos productos
// router.get('/all-product', allProduct)

//borrar un producto
router.post('/uploadCategory',uploadCategory)
router.get('/categories', allCategories)
router.delete('/delCategories/:id', delCategories)


router.delete('/delete-products/:id', deleteProduct)
router.post('/uploadImg',protect, imgProduct)



module.exports = router