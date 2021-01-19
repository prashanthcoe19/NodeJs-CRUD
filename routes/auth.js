require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/', (req, res) => res.json({ msg: 'Login Page' }));

router.get('/login', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send('user does not exist');
      }
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send({ msg: 'Server Error' });
    });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).send('Incorrect email or password');
      }
      const isMatch = bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send({ msg: 'Incorrect password' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
      // const validPassword = bcrypt.compare(req.body.password, user.password);
      // if (!validPassword) {
      //   return res.status(400).send('Incorrect password');
      // }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
