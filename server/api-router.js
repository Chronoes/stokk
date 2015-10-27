import {Router} from 'express';
import usersRouter from './routes/users-router';

const api = Router();

api.use((req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key) && req.body[key].length === 0) {
        res.status(400).json({
          message: `Value for "${key}" cannot be empty.`,
        });
        return;
      }
    }
  } else if (req.method === 'POST') {
    res.status(400).json({
      message: 'POST request cannot be empty.',
    });
    return;
  }
  next();
});

api.use('/users', usersRouter);

export default api;
