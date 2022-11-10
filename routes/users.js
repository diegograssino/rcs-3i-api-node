const router = require('express').Router();
const User = require('../models/user.js');

router
  .get('/all', async (req, res) => {
    console.log('GET /users/all');
    try {
      const allUsers = await User.find();
      res.status(200).send(allUsers);
    } catch (error) {
      res.status(400).json({ error: true, message: error });
    }
  })
  .get('/:name', async (req, res) => {
    const { name } = req.params;
    console.log('GET /users/' + name);
    try {
      const user = await User.findOne({
        name: name,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .post('/new', async (req, res) => {
    console.log('POST /users/new');
    const { body } = req;
    try {
      const newUser = new User(body);
      await newUser.save();
      res.status(200).json(newUser);
      console.log('ADD user ' + newUser.name);
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
      const modProduct = await User.findOneAndUpdate(id, body, {
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
      const delProduct = await User.findOneAndDelete({
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
