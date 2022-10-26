const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const MOCK = [
  {
    id: '1',
    title:
      'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image:
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: '2',
    title:
      'Mens Casual Premium Slim Fit T-Shirts ',
    price: 22.3,
    description:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    category: "men's clothing",
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
];

app.get('/products', (req, res) => {
  console.log('GET /products');
  const allProducts = MOCK;
  res.status(200).send(allProducts);
});

app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  console.log('GET /product/' + id);
  const product = MOCK.find(p => p.id === id);

  res.status(200).send(product);
});

app
  .route('/test')
  .get((req, res) => {
    console.log('GET /products');
    const allProducts = MOCK;
    res.status(200).send(allProducts);
  })
  .post((req, res) => {
    console.log(req.body);
    res.send('👍');
  });

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
