const express = require("express");
const crearProd = require("./api/producto.js");
const handlebars = require("express-handlebars");

const app = express();

const puerto = 8080;

//? No sé si irá en este archivo
const nuevosProductos = new crearProd();

//====================================================================
//* Para añadir Socket.io
const http = require("http").Server(app);

//* Pasamos la constante http a socket.io
const io = require("socket.io")(http);


//====================================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Espacio público del servidor
app.use(express.static(__dirname + "/public"));

//====================================================================

//* Para usar Socket.io cambiamos app por "http"
http
  .listen(puerto, () =>
    console.log(`Escuchando peticiones puerto localhost:${puerto}`)
  )
  .on("error", (error) => console.log(`Error en servidor ${error}`));

//====================================================================


//====================================================================
//Configuramos handlebars
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

//Establecemos el motor de plantillas a utilizar
app.set("view engine", "hbs");

//Establecemos el directorio donde se encuentran las plantillas
app.set("views", __dirname + "/views");

//====================================================================

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
  /* Envio los mensajes al cliente que se conectó */
  socket.emit("productos", nuevosProductos.listarTodos());

  /* Escucho los mensajes enviado por el cliente y se los propago a todos */
  socket.on('update', data => {
      io.sockets.emit('productos', nuevosProductos.listarTodos())
  });
});

//====================================================================

//* Protejo el servidor ante excepciones no atrapadas
app.use((err, req, res, next) => {
  console.log(err.message);
  return res.status(500).send("Error de conexión no atrapada")
});

//====================================================================

//Importo las rutas y las uso con el prefijo /api
const productosRouter = require('./routes/productos')
app.use('/api', productosRouter)
