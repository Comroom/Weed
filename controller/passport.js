var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var users = db['users'];

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});

passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done){
    var user = {
      'email' : email
    };
    users.findOne(user, function(err, doc){
      if(err){
        return done(err, false);
      }else{
        if( doc == null){
          return done(null, false);
        }
        if( doc.password === password ){
          return done(null, {
            _id : doc._id,
            email : doc.email,
            name : doc.name
          });
        }else{
          return done(null, false);
        }
      }
    });
  }
));

module.exports = passport;
