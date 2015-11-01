import {Router} from 'express';

import User from '../models/User';
import loginHandler from './users/login';
import registerHandler from './users/register';
import stocksHandler from './users/stocks';
import stockAddHandler from './users/stockAdd';
import stockUpdateHandler from './users/stockUpdate';
import stockRemoveHandler from './users/stockRemove';

const users = Router();

users.post('/login', loginHandler);
users.post('/register', registerHandler);

function accessForbidden(res) {
  return res.status(403).json({
    message: 'Access is forbidden.',
  });
}

users.all('/:id', (req, res, next) => {
  next();
});

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

users.route('/:id/stocks')
  .get(stocksHandler)
  .post(stockAddHandler)
  .put(stockUpdateHandler)
  .delete(stockRemoveHandler);

export default users;
