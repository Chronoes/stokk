import database from '../server/database';
import User from '../server/models/User';
import {genSaltyHash} from '../server/util';

before(done => {
  database.sync({ force: true }).then(() =>
    genSaltyHash('testingpass1'))
  .then(hash =>
    User.create({
      email: 'test1@stokk.io',
      password: hash,
    }))
  .then(() =>
    genSaltyHash('testingpass2'))
  .then(hash =>
    User.create({
      email: 'test2@stokk.io',
      password: hash,
    }))
  .then(() =>
    genSaltyHash('testingpass3'))
  .then(hash =>
    User.create({
      email: 'test3@stokk.io',
      password: hash,
    }))
  .then(() => done());
});
