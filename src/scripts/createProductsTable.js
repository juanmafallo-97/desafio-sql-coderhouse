const config = require("../mariadbConfig");
const knex = require("knex")(config);

knex.schema
  .createTable("products", (table) => {
    table.increments("id").primary().notNullable();
    table.string("title").notNullable();
    table.decimal("price").notNullable();
    table.string("thumbnail");
  })
  .then(() => console.log("Tabla de productos creada correctamente"))
  .catch((err) => console.log("Error: " + err));
