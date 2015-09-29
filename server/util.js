const bcrypt = require('bcrypt-as-promised');

exports.genSaltyHash = password => bcrypt.hash(password, 10);
