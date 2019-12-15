import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
const app = express();

// passport.use(new GoogleStrategy());

app.get('/', (req: Request, res: Response) => {
  res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server has started on port ${PORT}, use Ctrl + C to exit!`)
);
