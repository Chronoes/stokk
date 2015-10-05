const User = require('../models/User');
const genSaltyHash = require('../util').genSaltyHash;

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  return genSaltyHash(password)
    .then(hash => {
      User
        .findOrCreate({where: {email: email}, defaults: {email: email, password: hash}})
        .spread((user, created) => {
          if (created) {
            res.status(200).json({
              message: `User created: ID ${user.id}.`,
            });
          } else {
            res.status(409).json({
              message: `User with email ${email} exists.`,
            });
          }
        })
        .catch(() => {
          res.status(400).json({
            message: `Email "${email}" is incorrect.`,
          });
        });
    })
    .catch(err => {
      res.status(500).json({
        message: `Hashing failed with ${err}.`,
      });
    });
};
