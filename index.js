// Configuracion de express
const express = require('express');
const app = express();
// Configuracion del body parser de express
app.use(express.json());
// Configuracion de dotenv
require('dotenv').config();
// Configuracion de CORS (evito errores de CORS)
var cors = require('cors');
app.use(cors());
let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Importo el mock
const MOCK = require('./mocks/mocks');

// Dejo seteado en una constante el puerto, usar el que este en el env, sino 800
const PORT = process.env.PORT || 8000;

// Empiezo a programar los endopoints
app.get(
  '/products',
  cors(corsOptions),
  (req, res) => {
    console.log('GET /products');
    const allProducts = MOCK;
    res.status(200).send(allProducts);
  }
);

app.get(
  '/product/:id',
  cors(corsOptions),
  (req, res) => {
    const { id } = req.params;
    console.log('GET /product/' + id);
    const product = MOCK.find(p => p.id === id);

    res.status(200).json(product);
  }
);

app.post(
  '/checkout',
  cors(corsOptions),
  (req, res) => {
    const { body } = req;
    console.log('POST /checkout/');
    console.log(body);
    body.id = '1';

    res.status(200).json(body);
  }
);

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
