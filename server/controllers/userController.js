const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../model/userModel")

const nodemailer = require("nodemailer");
const Role = require("../model/roleModel")

//@Desc     Register user
//@Route    POST /api/users/register
//@Access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, dni, email, password, phone,address, roles } = req.body;

  if (!name || !dni || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ dni });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = new User({
    name,
    dni,
    email,
    password: hashedPassword,
    phone: "",
    address: ""
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    user.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    user.roles = [role._id];
  }

  const savedUser = await user.save();

  if (savedUser) {
    res.status(201).json({
      _id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      token: generateToken(savedUser._id),
      phone: savedUser.phone,
      address: savedUser.address
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});




//@Desc     Auth new user
//@Route    POST /api/users/login
//@Access   Public
const loginUser = asyncHandler(async(req,res)=>{

    const {dni,password} = req.body
   
    // check for user dni
    const user =  await User.findOne({dni}).populate("roles")

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
    // console.log(user);
    // res.json({message: 'Login User'})
})


//@Desc     Get data user
//@Route    GET /api/users/me
//@Access   Private
const getMe = asyncHandler(async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id);

  res.json({
    id: _id,
    name,
    email
  });
});


//@Desc     Forgot Password
//@Route    POST /api/users/forgot-password
//@Access   Public
const forgotPw = asyncHandler(async(req,res)=>{
  
      const {email} = req.body

        const authEmail = await User.findOne({email})
        if(!email){
            // res.status(400).json({stack: "invalid data"})
            res.status(400)
            throw new Error('Valide los campos')
            
        }else{


        const secretKey = process.env.JWT_SECRET + authEmail.password
        const token = jwt.sign({email: authEmail.email, id: authEmail._id}, secretKey, {
            expiresIn: "5m"
        })
        // const linkReset = `<a href="'https://backend-render-corp.onrender.com/api/users/reset-password/${authEmail._id}/${token}">Click For Reset<a/>`;
        const linkReset = `<a href="http://localhost:5000/api/users/reset-password/${authEmail._id}/${token}">Click For Reset<a/>`;
        
        contentHTML = `
        <h1>User Information</h1>
        <p>"Desde la logistica de SIAC CORPORATION le hacemos envio de su link para el restablecimiento de su contraseña. 
        Muchas Gracias por usar nuestro aplicativo."</p>
        <ul>
            <li>Reset Password: ${linkReset}</li>
        </ul>
    `;
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "corporationsiac@gmail.com",
              pass: "mwbtsbmxjymgkhgu",
            },
          });
      
          let mailOptions = {
            from: '"SIAC COMPANY" <corporationsiac@gmail.com>',
            to: authEmail.email,
            subject: "Forgot password ✔",
            html: contentHTML,
          };
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              // res.status(400).json({stack: "Email error"})
              res.status(400)
              throw new Error('Email error')
            } else {
              
               res.json({
                email: authEmail.email
              })
              console.log("Envio Exitoso");
              //  throw new Error("Envio Exitoso")
           }
          });
          
  
        }
         
      });

//@Desc     Reset Password
//@Route    POST /api/users/reset-password
//@Access   Public
const resetUpdate = asyncHandler( async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const authEmail = await User.findOne({ _id: id });
  if (!authEmail) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = process.env.JWT_SECRET + authEmail.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.json({ email: verify.email, data: password,  status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
    
  }
});

//@Desc     Update Information
//@Route    PUT /api/users/updateInfo/:id
//@Access   Private
const updateUsers = asyncHandler( async (req, res) => {
  const { id } = req.params;
  const { password,email } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "User Not Exists!!" });
  }

    try {
      // password
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt);

      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
            email: email
          },
        }
      );
  
      res.status(200).json(
        {
        _id: user.id,
        name: user.name,
        dni: user.dni,
        email: user.email,
        roles: user.roles.name,
        status: "Actualizado"
       }
        );

    } catch (error) {
      console.log(error);
    res.json({ status: "Something Went Wrong" });
    }
  
   
  // } catch (error) {
  //   console.log(error);
  //   res.json({ status: "Something Went Wrong" });
    
  // }
});


//@Desc     Update Information
//@Route    DELETE /api/users/deleteUser/:id
//@Access   Private
const deleteUser = asyncHandler( async (req, res) => {
  const { id } = req.params;
  // const { password,email } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "User Not Exists!!" });
  }else{
    res.json({status: "Eliminado"})
    user.remove();
  }


  
   
  // } catch (error) {
  //   console.log(error);
  //   res.json({ status: "Something Went Wrong" });
    
  // }
});

//@Desc     Update Information
//@Route    PUT /api/users/profile
//@Access   Private
const profileUser = asyncHandler(async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  // Verificar si se proporcionó una contraseña
  let hashedPassword = null;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  try {
    // Verificar el token de autenticación
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'Invalid Authorization Header' });
    }

    // Extraer el token sin la parte "Bearer"
    const authToken = token.split(' ')[1];

    // Verificar y decodificar el token para obtener el ID de usuario
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    // Construir el objeto de actualización con los campos correspondientes
    const updateFields = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    // Actualizar la contraseña si se proporcionó una
    if (hashedPassword) {
      updateFields.password = hashedPassword;
    }

    // Actualizar el usuario en la base de datos
    await User.updateOne({ _id: userId }, { $set: updateFields });

    res.status(200).json({ status: 'Actualizado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'Something Went Wrong' });
  }
});






//Generate Token
// si expira el token pide al user, volver a logearse
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '20d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    forgotPw,
    resetUpdate,
    updateUsers,
    deleteUser,
    profileUser
}