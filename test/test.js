import bcrypt from 'bcrypt-as-promised';
import User from '../server/models/User';

function genHash(password) {
  return bcrypt.hash(password, 10);
}

before(done => {
  User.sync({force: true}).then(() =>
    genHash('testingpass1'))
  .then(hash =>
    User.create({
      email: 'test1@stokk.io',
      password: hash,
    }))
  .then(() =>
    genHash('testingpass2'))
  .then(hash =>
    User.create({
      email: 'test2@stokk.io',
      password: hash,
    }))
  .then(() =>
    genHash('testingpass2'))
  .then(hash =>
    User.create({
      email: 'test3@stokk.io',
      password: hash,
    }))
  .catch(console.error)
  .then(() => done());
});
