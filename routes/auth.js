const router = require('express').Router();

router
  .post('/login', (req, res) => {
    res.status(200).json('Ok');
  })
  .post('/register', (req, res) => {
    res.status(200).json('Ok');
  })
  .post('/roles', (req, res) => {
    res.status(200).json('Ok');
  })
  .get('/users', (req, res) => {
    res.status(200).json('Ok');
  });

module.exports = router;
