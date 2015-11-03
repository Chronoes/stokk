import {Router} from 'express';

import User from '../models/User';
import loginHandler from './users/login';
import registerHandler from './users/register';
import stocksHandler from './users/stocks';
import stockAddHandler from './users/stockAdd';
import stockRemoveHandler from './users/stockRemove';

import {verifyAuthorization} from '../util';

const users = Router();

users.post('/login', loginHandler);
users.post('/register', registerHandler);

users.param('id', (req, res, next, id) =>
  verifyAuthorization(req.headers.authorization)
  .then(payload =>
    User.findById(id)
    .then(user => {
      if (user !== null && user.id.toString() === payload.id) {
        req.user = user;
        next();
      } else {
        res.status(403).json({
          message: 'Access is forbidden.',
        });
      }
    }))
  .catch(err => res.status(401).json({
    message: err,
  }))
);

users.route('/:id/stocks')
  .get(stocksHandler)
  .post(stockAddHandler)
  .delete(stockRemoveHandler);

export default users;
