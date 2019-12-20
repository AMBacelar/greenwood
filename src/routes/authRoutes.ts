import passport from 'passport';
import { Router } from 'express';
/* eslint-disable new-cap */
const authRoutes = Router();

authRoutes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
authRoutes.get('/auth/google/callback', passport.authenticate('google'));

export default authRoutes;
