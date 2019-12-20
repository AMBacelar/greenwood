import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';

import './models/user';
import './services/passport';
import router from './router';

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

export default app;
