import database from '../server/database';
import User from '../server/models/User';
import {genSaltyHash} from '../server/util';

before(done => {
  const users = [
    {
      email: 'test1@stokk.io',
      password: 'testingpass1',
    },
    {
      email: 'test2@stokk.io',
      password: 'testingpass2',
    },
    {
      email: 'test3@stokk.io',
      password: 'testingpass3',
    },
  ].map(user =>
    genSaltyHash(user.password)
    .then(hash => {
      return {email: user.email, password: hash};
    })
  );
  database.sync({ force: true })
  .then(() =>
    Promise.all(users))
  .then(hashedUsers =>
    User.bulkCreate(hashedUsers))
  .then(() => done())
  .catch(err => done(err));
});
