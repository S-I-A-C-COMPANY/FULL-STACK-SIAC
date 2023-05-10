const express = require("express")
const colors = require('colors')
const dotenv = require("dotenv").config() //variables de entorno //config archivo de var
const { connectDB } = require("./config/db")
const {errorHandler} = require("./middleware/errorMiddleware")
const {createRoles} = require("./libs/initialSetup")

const app = express()
// Crear un servidor HTTP utilizando el módulo 'http' de Node.js y asociarlo con la instancia de la aplicación 'app'
const http = require("http").createServer(app)
// Crear una instancia de socket.io y asociarla con el objeto servidor HTTP creado anteriormente.
const io = require("socket.io")(http)

createRoles()
connectDB()

app.use(express.json()) //leer body
app.use(express.urlencoded({extended: false})) //leer URL

io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// app.use("/api/goals", require("./routes/goalsRouts.js"))
app.use("/api/products", require("./routes/productsRouts"))
app.use("/api/users", require("./routes/userRouts.js"))

app.use(errorHandler)

app.set("port", process.env.PORT || 5000)

// Utilizamos nuestro servidor HTTP para escuchar las conexiones de socket.io
http.listen(app.get("port"), () => {
    console.log(`Listen on port : ${app.get("port")}`);
});

module.exports = app;


// ANTES
// app.set("port",process.env.PORT || 5000)
// app.listen(app.get("port"),()=>console.log(`Listen on port : ${app.get("port")}`))

// module.exports = app;