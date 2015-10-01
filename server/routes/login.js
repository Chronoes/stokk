const User = require('../models/User');
const util = require('../util');

function doesNotExist(res, email) {
  res.status(401).json({
    message: `User ${email} does not exist or password is wrong.`,
  });
}

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  return User.findOne({where: {email: email}})
    .then(user => {
      if (user !== null) {
        util.compareSaltyHash(password, user.password)
        .then(() => {
          res.status(200).json({
            message: `User authorization successful.`,
            token: util.signToken({id: user.id, email: email}),
          });
        })
        .catch(() => {
          doesNotExist(res, email);
        });
      } else {
        doesNotExist(res, email);
      }
    });
};
