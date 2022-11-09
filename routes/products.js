const router = require('express').Router();
const Product = require('../models/product');

router
  .get('/all', async (req, res) => {
    console.log('GET /products');

    try {
      const allProducts = await Product.find();
      console.log(allProducts);
      res.status(200).send(allProducts);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, data: error });
    }
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log('GET /product/' + id);
    try {
      const product = await Product.findOne({ _id: id });
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, data: error });
    }
  })
  .post('/new', async (req, res) => {
    console.log('POST /product/new');
    const { body } = req;
    try {
      const newProduct = new Product(body);
      await newProduct.save();
      res.status(200).json(newProduct);
      console.log('ADD id ' + newProduct._id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, data: error });
    }
  });

module.exports = router;
