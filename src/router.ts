import { Router } from 'express';
import authRoutes from './routes/authRoutes';
/* eslint-disable new-cap */
const router = Router();

router.use(authRoutes);

router.get('/', (req, res) =>
  res.send('authenticate with <a href="/auth/google">"/auth/google"</a> route')
);

router.get('/api/current_user', (req, res) => res.send(req.user));
router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

export default router;
