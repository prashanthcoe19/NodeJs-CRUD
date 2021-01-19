require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.json({ msg: 'create a user' }));

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).send('User already exists');
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
        user
          .save()
          .then((user) => {
            const payload = {
              user: {
                id: user.id,
              },
            };
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
              if (err) throw err;
              res.json({ token });
            });
          })
          .catch((err) => console.log(err));
      });
    }
  });
});
module.exports = router;
