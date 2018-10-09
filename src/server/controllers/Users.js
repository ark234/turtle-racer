// imports
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {

  createUserMiddleWare: function(req, res, next) {
    // This is where we obtain the hash of the user's password
    console.log('creating user: ', req.body.username);
    const passwordDigest = bcrypt.hashSync(password, 10);
    User.createUser(user, passwordDigest)
      .then(user => {
        res.locals.newTokenData = user[0].username;
        next()
      })
      .catch(err => console.log('Error creating user ', err));
  },

  verifyUserMiddleware: function(req, res, next) {
    console.log('verifying user', req.body.username);
    User.findUser(req.body.username)
      .then(row => {
        if (bcrypt.compareSync(req.body.password, row[0].password_digest))
          next();
      })
      .catch(err => {
        console.log("username and or password incorrect", err);
      })
  }
}
