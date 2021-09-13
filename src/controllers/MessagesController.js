const config = require("../sqlite3Config");
const knex = require("knex")(config);

class MessagesApi {
  async save(message) {
    try {
      const newMewssageId = await knex("messages").insert(message);
      return await knex("messages").where("id", newMewssageId);
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async getAll() {
    try {
      const messages = await knex("messages");
      return messages;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }
}

module.exports = MessagesApi;
