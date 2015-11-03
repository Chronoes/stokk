import {Router} from 'express';
import usersRouter from './routes/users-router';
import stocksRouter from './routes/stocks-router';

const api = Router();

api.use((req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key) && req.body[key].length === 0) {
        return res.status(400).json({
          message: `Value for "${key}" cannot be empty.`,
        });
      }
    }
  } else if (req.method !== 'GET') {
    return res.status(400).json({
      message: `${req.method} request cannot be empty.`,
    });
  }
  next();
});

api.use('/users', usersRouter);
api.use('/stocks', stocksRouter);

export default api;
