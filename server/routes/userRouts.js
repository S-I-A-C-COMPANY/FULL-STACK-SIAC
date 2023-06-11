const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  forgotPw,
  resetUpdate,
  updateUsers,
  deleteUser,
  profileUser,
  getUsers,
  roleUser,
  uploadImage
} = require("../controllers/userController");

const multer = require("multer");

// Configura Multer para almacenar los archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPw);
router.post("/reset-password/:id/:token", resetUpdate);

// Ruta para cargar la imagen
router.post("/upload", protect, upload.single("file"), uploadImage);

router.delete("/deleteUser/:id", protect, deleteUser);
router.get("/all", getUsers);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, profileUser);
router.put("/update-role", protect, roleUser);

module.exports = router;
