const express = require('express');
const app = express();
const router = require('express').Router();
const Product = require('../models/product');
const cors = require('cors');
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router
  .get('/all', cors(corsOptions), async (req, res) => {
    console.log('GET /products/all');
    try {
      const allProducts = await Product.find();
      res.status(200).send(allProducts);
    } catch (error) {
      res.status(400).json({ error: true, message: error });
    }
  })
  .get('/:id', cors(corsOptions), async (req, res) => {
    const { id } = req.params;
    console.log('GET /products/' + id);
    try {
      const product = await Product.findOne({
        _id: id,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
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
      res.status(400).json({ error: true, message: error });
    }
  })
  .put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log('PUT/product/' + id);
    try {
      const modProduct = await Product.findOneAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modProduct);
      console.log('MOD id ' + modProduct._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log('DELETE/product/' + id);
    try {
      const delProduct = await Product.findOneAndDelete({
        _id: id,
      });
      res.status(200).json(delProduct);
      console.log('DEL id ' + delProduct._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
