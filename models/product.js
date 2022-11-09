const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 48,
  },
  price: String,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model(
  'products',
  productSchema
);
module.exports = Product;
