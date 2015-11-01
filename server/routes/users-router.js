import {Router} from 'express';

import User from '../models/User';
import loginHandler from './users/login';
import registerHandler from './users/register';
import stocksHandler from './users/stocks';
import stockAddHandler from './users/stockAdd';

const users = Router();

users.post('/login', loginHandler);
users.post('/register', registerHandler);

function accessForbidden(res) {
  return res.status(403).json({
    message: 'Access is forbidden.',
  });
}

users.param('id', (req, res, next, id) => {
  return User.findById(id)
    .then(user => {
      if (user !== null) {
        req.user = user;
        next();
      } else {
        accessForbidden(res);
      }
    })
    .catch(() => accessForbidden(res));
});

users.get('/:id/stocks', stocksHandler);
users.post('/:id/stocks', stockAddHandler);

export default users;
