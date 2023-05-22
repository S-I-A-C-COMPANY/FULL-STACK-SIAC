const express = require("express")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()
const { 
    registerUser, 
    loginUser,
    getMe,
    forgotPw,
    resetUpdate, 
    updateUsers,
    deleteUser,
    profileUser
} = require("../controllers/userController")



router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPw)
router.post('/reset-password/:id/:token', resetUpdate)
// ruta para actualizar
router.put('/updateInfo/:id',protect ,updateUsers)
router.delete('/deleteUser/:id',protect ,deleteUser)

router.get('/me/:id',protect,getMe)
router.get('/profile',protect, profileUser)



module.exports = router