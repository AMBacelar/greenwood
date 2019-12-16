import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import './env';
import './services/passport';
import authRoutes from './routes/authRoutes';

mongoose.connect(process.env.MONGODB_CONNECTION_URI);

const app = express();

app.get('/', (req: Request, res: Response) =>
  res.send('authenticate with "/auth/google" route')
);

app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server has started on port ${PORT}, use Ctrl + C to exit!`)
);
