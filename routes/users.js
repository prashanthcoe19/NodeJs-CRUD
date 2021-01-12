const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => res.json({ msg: 'create a user' }));

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).send('User already exists');
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
        user
          .save()
          .then((user) => {
            res.json({ msg: 'User registered' });
          })
          .catch((err) => console.log(err));
      });
    }
  });
});
module.exports = router;
