const router = require('express').Router();

router.post('/', (req, res) => {
  const { body } = req;
  console.log('POST /cart/');
  console.log(body);
  body.id = '1';

  res.status(200).json(body);
});

module.exports = router;
