const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config() //variables de entorno //config archivo de var
const { connectDB } = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const {createRoles} = require("./libs/initialSetup")
const http = require("http")
// sockets
const { Server } = require("socket.io")
const cors = require('cors');
const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }
    else {
    //move on
      next();
    }
  });


// io.on("connection", (socket) => {
//     console.log(`Usuario conectado: ${socket.id}`);

//     socket.on('disconnect', () => {
//         console.log('Usuario desconectado');
//     });
// });

createRoles()
connectDB()

app.use(express.json()) //leer body
app.use(express.urlencoded({extended: false})) //leer URL



// app.use("/api/goals", require("./routes/goalsRouts.js"))
app.use("/api/products", require("./routes/productsRouts"))
app.use("/api/users", require("./routes/userRouts.js"))

app.use(errorHandler)

app.set("port", process.env.PORT || 5000)

// Utilizamos nuestro servidor HTTP para escuchar las conexiones de socket.io
server.listen(app.get("port"), () => {
    console.log(`Listen on port : ${app.get("port")}`);
});

module.exports = app;

