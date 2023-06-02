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
    profileUser,
    getUsers
} = require("../controllers/userController")



router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPw)
router.post('/reset-password/:id/:token', resetUpdate)
// ruta para actualizar
// router.put('/updateInfo/:id',protect ,updateUsers)
router.delete('/deleteUser/:id',protect ,deleteUser)

router.get('/all', getUsers)
router.get('/me',protect,getMe)
router.put('/update-profile',protect, profileUser)



module.exports = router