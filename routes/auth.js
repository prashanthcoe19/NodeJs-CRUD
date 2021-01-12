const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => res.json({ msg: 'Login Page' }));

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(400).send('Incorrect email or password');
      }
      if (req.body.password != user.password) {
        return res.status(400).send('Incorrect password');
      }
      res.send(true);
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
