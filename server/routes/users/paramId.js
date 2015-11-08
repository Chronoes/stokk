import User from '../../models/User';
import {verifyAuthorization} from '../../util';

export default (req, res, next, id) =>
  verifyAuthorization(req.headers.authorization)
  .then(payload =>
    User.findById(parseInt(id, 10))
    .then(user => {
      if (user !== null && user.id === parseInt(payload.id, 10)) {
        req.user = user;
        next();
      } else {
        res.status(403).json({
          message: 'Access is forbidden.',
        });
      }
    }))
  .catch(err => res.status(401).json({
    message: err.toString(),
  }));
