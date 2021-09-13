const config = require("../mariadbConfig");
const knex = require("knex")(config);

class ProductsController {
  async save(product) {
    try {
      const newProductId = await knex("products").insert(product);
      return await knex("products").where("id", newProductId);
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error escribiendo los datos: " + error.message
      );
    }
  }

  async getById(id) {
    try {
      const product = await knex("products").where("id", id);
      return product;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }

  async getAll() {
    try {
      const allProducts = await knex("products");
      return allProducts;
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error obteniendo los datos: " + error.message
      );
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      await knex("products").where("id", id).update(updatedProduct);
      return knex("products").where("id", id);
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error actualizando el producto:" + error.message
      );
    }
  }

  async deleteById(id) {
    try {
      await knex("products").where("id", id).del();
    } catch (error) {
      throw new Error(
        "Ha ocurrido un error borrando el producto: " + error.message
      );
    }
  }
}

module.exports = ProductsController;
