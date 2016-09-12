var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var users = db['users'];

passport.serializeUser(function(user, done){
  console.log('serialize');
  done(null, user.email);
});

passport.deserializeUser(function(email, done){
  console.log('deserialize');
  console.log(email);

  done(null, email);
});

passport.use(new LocalStrategy({
    usernameField : 'userid',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, userid, password, done){
    var user = {
      'email' : userid,
      'password' : password
    };
    users.find(user, function(err, docs){
      if(err){
        return done(err, false);
      }else{
        if(docs.length == 0){
          return done(null, false);
        }else{
          console.log("correct!!");
          return done(null, user);
        }
      }
    });
  }
));

module.exports = passport;
