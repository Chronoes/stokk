const User = require('./models/User');
const bcrypt = require('bcrypt-as-promised');

exports.login = (req, res) => {
  res.send('I am login page');
};

exports.register = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, 10)
    .then(hash => {
      User
        .findOrCreate({where: {email: email}, defaults: {email: email, password: hash}})
        .spread((user, created) => {
          console.log(user.get({plain: true}));
          if (created) {
            res.status(200).json({
              message: `User created: ID ${user.get('id')}`,
            });
          } else {
            res.status(409).json({
              message: `User with email ${email} exists`,
            });
          }
        });
    })
    .catch(err => {
      res.status(500).json({
        message: `Hashing failed with ${err}`,
      });
    });
};