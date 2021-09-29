const faker = require("faker");
const router = require("express").Router();

faker.locale = "es";

const getFakeProducts = () => {
  const products = [];

  for (let i = 0; i < 5; i++) {
    const product = {
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      /* La ultima parte de la imagen es para prevenir que el navegador no obtnega siempre la misma  */
      foto: faker.image.image()
    };
    products.push(product);
  }
  console.log(products);
  return products;
};

router.get("/", (req, res) => {
  const products = getFakeProducts();
  res.render("testProducts", { products });
});

module.exports = router;
