const router = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router
  .get('/all', async (req, res) => {
    console.log('GET /users/all');
    try {
      const allUsers = await User.find();
      res.status(200).send(allUsers);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error });
    }
  })
  .post('/login', async (req, res) => {
    const { body } = req;
    console.log('POST /users/login');

    const user = await User.findOne({
      name: body.name,
    });

    const passwordOk = await bcrypt.compare(
      body.password,
      user.password
    );

    if (user && passwordOk) {
      return res.status(200).json({
        error: null,
        message: 'User and password OK',
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Credentials are WRONG',
      });
    }
  })
  .post('/register', async (req, res) => {
    console.log('POST /users/register');
    const { body } = req;

    const newUserNameExist = await User.findOne({
      name: body.name,
    });

    const newUserMailExist = await User.findOne({
      mail: body.mail,
    });

    // Cheque doble de previa existencia del usuario, en la API y en el Schema con unique
    if (newUserNameExist || newUserMailExist) {
      return res.status(400).json({
        error: true,
        message: 'User or email already exists',
      });
    }

    // Aplico bcrypt
    const salt = await bcrypt.genSalt(6);
    const encryptedPassword = await bcrypt.hash(
      body.password,
      salt
    );

    try {
      const newUser = new User({
        name: body.name,
        mail: body.mail,
        password: encryptedPassword,
      });
      await newUser.save();
      newUser.password = body.password;
      res.status(200).json(newUser);
      console.log('ADD user ' + newUser.name);
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: true, message: error });
    }
  })
  .put('/update/:username', async (req, res) => {
    const { username } = req.params;
    const { body } = req;
    console.log('PUT/users/update' + username);
    try {
      const modUser = await User.findOneAndUpdate(
        username,
        body,
        {
          useFindAndModify: false,
        }
      );
      res.status(200).json(modUser);
      console.log('MOD user ' + modUser.name);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .delete(
    '/delete/:username',
    async (req, res) => {
      const { username } = req.params;
      console.log('DELETE/users/' + username);

      // chequeo previamente si el user es el super usuario para no borrarlo nunca
      const SUPER_USER = 'admin';

      if (username === SUPER_USER) {
        return res.status(400).json({
          error: true,
          message: 'This user cannot be erased!',
        });
      }

      try {
        const delUser =
          await User.findOneAndDelete({
            name: username,
          });
        res.status(200).json(delUser);
        console.log('DEL user ' + delUser.name);
      } catch (error) {
        console.log(error);
        res.status(404).json({
          error: true,
          message: error,
        });
      }
    }
  );

module.exports = router;
