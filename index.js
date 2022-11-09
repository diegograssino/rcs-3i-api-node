// Configuracion de express
const express = require('express');
const app = express();
// Configuracion del body parser de express
app.use(express.json());
// Configuracion de mongoose
const mongoose = require('mongoose');

// TODO: Cambiar a variable de entorno
const user = 'rcs-3i';
const pass = 'WI2oouZ9S3PuKwxY';
const db = '3i-ecomm';
const uri = `mongodb+srv://${user}:${pass}@cluster0.qcvf3as.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log('Database connection OK')
  )
  .catch(error => console.error(error));

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
// const MOCK = require('./mocks/mocks');

// Dejo seteado en una constante el puerto, usar el que este en el env, sino 800
const PORT = process.env.PORT || 8000;

// Empiezo a programar los endopoints
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

app.use(
  '/products',
  cors(corsOptions),
  productsRoutes
);

app.use('/users', cors(corsOptions), usersRoutes);

// Esta funcion es la que corre la API, si no esta, no se autoejecuta.
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
