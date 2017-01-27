import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {users} from '../db.js';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  const user = {email};

  users.findOne(user, (err, doc) => {
    if (err) {
      return done(err, false);
    }
    if (doc === null) {
      return done(null, false);
    }

    if (doc.password === password) {
      return done(null, {
        _id: doc._id,
        email: doc.email,
        name: doc.name
      });
    }
    return done(null, false);
  });
}));

export default passport;
