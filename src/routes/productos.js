const express = require("express");
const ProductsController = require("../controllers/ProductsController.js");

const router = express.Router();
const controller = new ProductsController();

router.get("/", async (req, res) => {
  try {
    const productos = await controller.getAll();
    res.status(201).json(productos);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await controller.getById(id);
    res.status(201).json(producto);
  } catch (error) {
    res.send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    newProduct = await controller.save(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = req.body;
    const updatedProduct = await controller.updateProduct(id, product);
    res.status(201).json(updatedProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await controller.deleteById(id);
    res.json({ success: `Product with id ${id} deleted` });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
