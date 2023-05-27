const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del encabezado
      token = req.headers.authorization.split(' ')[1];

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener el usuario a partir del token
      req.user = await User.findById(decoded.id).select('-password');

      next();

    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('No autorizado');
    }
  }

  if (!token) {
    res.status(401);
    res.redirect('/'); // Redireccionar al usuario fuera de la página
  }
});

module.exports = {
  protect
};
