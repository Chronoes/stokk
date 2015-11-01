import User from '../../models/User';
import {compareSaltyHash, signToken} from '../../util';

function doesNotExist(res, email) {
  res.status(401).json({
    message: `User ${email} does not exist or password is wrong.`,
  });
}
export default (req, res) => {
  const {email, password} = req.body;
  return User.findOne({where: {email}})
    .then(user => {
      if (user !== null) {
        compareSaltyHash(password, user.password)
          .then(() => {
            res.status(200).json({
              message: `User authorization successful.`,
              token: signToken({id: user.id, email}),
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
