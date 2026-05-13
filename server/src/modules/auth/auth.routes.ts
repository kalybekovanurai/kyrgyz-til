import { Router } from 'express';
import { env } from '../../config/env';
import { requireAdmin } from '../../middlewares/requireAdmin';

export const authRouter = Router();

authRouter.post('/login', (req, res) => {
  if (req.body?.password !== env.adminPassword) {
    return res.status(401).json({ message: 'Invalid admin password.' });
  }

  res.json({ token: env.adminToken });
});

authRouter.get('/me', requireAdmin, (_req, res) => {
  res.json({ ok: true, role: 'admin' });
});
