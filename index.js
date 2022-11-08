// Configuracion de express
const express = require('express');
const app = express();
// Configuracion del body parser de express
app.use(express.json());
// Configuracion de mongoose
const mongoose = require('mongoose');

const user = 'rcs-3i';
const pass = 'WI2oouZ9S3PuKwxY';
const db = '3i-ecomm';
const uri = `mongodb+srv://${user}:${pass}@cluster0.qcvf3as.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection OK'))
  .catch(error => console.error(error));

const Product = require('./models/product');

// Configuracion de dotenv
require('dotenv').config();
// Configuracion de CORS (evito errores de CORS)
var cors = require('cors');
app.use(cors());
let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Configuracion a BBDD
const mongoose = require('mongoose');

const user = 'diegograssino1';
const pass = 'f5l1xpRSCTiBxwPU';
const db = 'test';
const uri = `mongodb+srv://${user}:${pass}@cluster0.fvyqeze.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection OK'))
  .catch(error => console.error(error));

const Product = require('./models/product');
// Importo el mock
const MOCK = require('./mocks/mocks');

// Dejo seteado en una constante el puerto, usar el que este en el env, sino 800
const PORT = process.env.PORT || 8000;

// Empiezo a programar los endopoints
app.get('/products', cors(corsOptions), async (req, res) => {
  console.log('GET /products');
  const allProducts = await Product.find();
  console.log(allProducts);
  res.status(200).send(allProducts);
});

app.post('/product/new', cors(corsOptions), async (req, res) => {
  console.log('POST /product/new');
  const { body } = req;
  try {
    const newProduct = new Product(body);
    await newProduct.save();
    res.status(200).json(newProduct);
    console.log('ADD id ' + newProduct._id);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

app.get('/product/:id', cors(corsOptions), (req, res) => {
  const { id } = req.params;
  console.log('GET /product/' + id);
  const product = MOCK.find(p => p.id === id);
  res.status(200).json(product);
});

app.post('/checkout', cors(corsOptions), (req, res) => {
  const { body } = req;
  console.log('POST /checkout/');
  console.log(body);
  body.id = '1';

  res.status(200).json(body);
});

// Ejemplo utilizando el router de express
app
  .route('/test')
  .get((req, res) => {
    console.log('GET /products');
    const allProducts = MOCK;
    res.status(200).json(allProducts);
  })
  .post((req, res) => {
    console.log(req.body);
    res.json('👍');
  });

// Esta funcion es la que corre la API, si no esta, no se autoejecuta.
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
