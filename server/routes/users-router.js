import {Router} from 'express';

import User from '../models/User';
import loginHandler from './users/login';
import registerHandler from './users/register';
import stocksHandler from './users/stocks';

const users = Router();

users.post('/login', loginHandler);
users.post('/register', registerHandler);

function doesNotExist(res) {
  res.status(401).json({
    message: `User does not exist.`,
  });
}

users.param('id', (req, res, next, id) => {
  return User.findOne({where: {id}})
    .then(user => {
      if (user !== null) {
        req.user = user;
        next();
      } else {
        doesNotExist(res);
      }
    })
    .catch(() => doesNotExist(res));
});

users.get('/:id/stocks', stocksHandler);

export default users;
