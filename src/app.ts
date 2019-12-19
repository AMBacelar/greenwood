import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';

import './env';
import './models/user';
import './services/passport';
import authRoutes from './routes/authRoutes';

mongoose.connect(process.env.MONGODB_CONNECTION_URI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response) =>
  res.send('authenticate with <a href="/auth/google">"/auth/google"</a> route')
);

app.get('/api/current_user', (req: Request, res: Response) =>
  res.send(req.user)
);
app.get('/api/logout', (req: Request, res: Response) => {
  req.logout();
  res.send(req.user);
});

app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server has started on port ${PORT}, use Ctrl + C to exit!`)
);
