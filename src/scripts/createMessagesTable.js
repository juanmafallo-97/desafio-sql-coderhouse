const config = require("../sqlite3Config");
const knex = require("knex")(config);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id").primary().notNullable();
    table.string("email").notNullable();
    table.string("content").notNullable();
    table.string("time").notNullable();
  })
  .then(() => console.log("Tabla de mensajes creada correctamente"))
  .catch((err) => console.log("Error: " + err));
