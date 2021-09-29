/* Para que la aplicación funcione se debe tener una base de datos llamada "productsdb" en localhost, y correr los scripts para crear las tablas necesarias */

const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost/4000"]
  }
});
const handlebars = require("express-handlebars");
const testProductsRouter = require("./src/routes/productos-test");
const ProductsController = require("./src/controllers/ProductsController.js");
const MessagesController = require("./src/controllers/MessagesController.js");

const productsController = new ProductsController();
const messagesController = new MessagesController();

const PORT = 4000;

/*  Config del socket  */
io.on("connection", async (socket) => {
  console.log("Usuario conectado");

  //Manejo de productos
  const products = await productsController.getAll();
  socket.emit("products", products);

  socket.on("new-product", async (product) => {
    await productsController.save(product);
    const updatedProducts = await productsController.getAll();
    io.sockets.emit("products", updatedProducts);
  });

  //Manejo de mensajes
  const messages = await messagesController.getAll();
  socket.emit("messages", messages);

  socket.on("new-message", async (message) => {
    await messagesController.save(message);
    const updatedMessages = await messagesController.getAll();
    io.sockets.emit("messages", updatedMessages);
  });
});

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Productos de prueba
app.use("/api/productos-test", testProductsRouter);

app.get("/", (req, res) => {
  res.render("home");
});

httpServer.listen(PORT, () =>
  console.log("Servidor activo en puerto: " + PORT)
);
