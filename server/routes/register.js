import User from '../models/User';
import {genSaltyHash, signToken} from '../util';

export default (req, res) => {
  const {email, password} = req.body;
  return genSaltyHash(password)
    .then(hash => {
      User
        .findOrCreate({where: {email}, defaults: {email, password: hash}})
        .spread((user, created) => {
          if (created) {
            res.status(200).json({
              message: 'User created.',
              token: signToken({id: user.id, email}),
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
