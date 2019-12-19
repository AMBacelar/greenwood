import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

const User = mongoose.model('Users');

passport.serializeUser((user: mongoose.Document, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => User.findById(id, done));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // we already have a record with existing ID
          console.log(existingUser);
          done(null, existingUser);
        } else {
          // TODO: proper error handling for not finding user
          // we don't have a user record with this ID
          new User({ googleId: profile.id, name: profile.displayName })
            .save()
            .then(user => done(null, user));
          // TODO: catch statement
        }
      });
    }
  )
);
