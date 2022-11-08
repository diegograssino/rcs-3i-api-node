const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
});

<<<<<<< HEAD
const Product = mongoose.model('test1', productSchema);
=======
const Product = mongoose.model(
  'products',
  productSchema
);
>>>>>>> origin/main
module.exports = Product;
