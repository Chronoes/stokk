import {Router} from 'express';

import loginHandler from './users/login';
import registerHandler from './users/register';
import stocksHandler from './users/stocks';
import stockAddHandler from './users/stockAdd';
import stockRemoveHandler from './users/stockRemove';
import paramIdHandler from './users/paramId';

const users = Router();

users.post('/login', loginHandler);
users.post('/register', registerHandler);

users.param('id', paramIdHandler);

users.route('/:id/stocks')
  .get(stocksHandler)
  .post(stockAddHandler);

users.delete('/:id/stocks/:symbol', stockRemoveHandler);

export default users;
