const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
});

const Product = mongoose.model('test1', productSchema);
module.exports = Product;
