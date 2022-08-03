const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const initializePassport = () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          // console.log("can't find this user");
          return done(null, false, { message: "Incorrect username or password" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect username or password" })
          }
        });
        // return done(null, user);
      });
    })
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET
      },
      async function (jwtPayload, done) {
        console.log(jwtPayload);
        return User.findOne(jwtPayload._id)
          .then(user => {
            console.log("user found!" + user.username);
            done(null, user)
          })
          .catch(e => {
            console.log(e);
            done(null, false)
          })
      }
    )
  )

}

module.exports = initializePassport;

