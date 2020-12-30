const pool = require("./db");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  // passport.use(
  //   new LocalStrategy((email, password, done) => {
  //     pool.query(
  //       "select * from users where email = $1",
  //       [email],
  //       (error, user) => {
  //         if (error) throw error;
  //         if (!user.rows[0]) return done(null, false);
  //         bcrypt.compare(password, user.rows[0].password, (err, result) => {
  //           if (err) throw err;
  //           if (result) {
  //             return done(null, user.rows[0]);
  //           } else {
  //             return done(null, false);
  //           }
  //         });
  //       }
  //     );
  //   })
  // );

  const authenticateUser = (email, password, done) => {
    pool.query(
      "select * from users where email = $1",
      [email],
      (error, results) => {
        if (error) throw error;

        console.log(results.rows[0]);
        if (results.rows[0].length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        } else {
          return done(null, false, { message: "No user with that email" });
        }
      }
    );
  };

  passport.use(new LocalStrategy(
    {
      "usernameField": "email",
      "passwordField": "password"
    },
    authenticateUser
  ))

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    pool.query("select * from users where id = $1", [id], (err, user) => {
      if (err) throw err
      return done(err, user);
    });
  });
};
