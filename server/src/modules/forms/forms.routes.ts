import { Router } from 'express';
import { query } from '../../db/pool';
import { createId } from '../../shared/entity';

export const formsRouter = Router();

formsRouter.post('/subscriptions', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const source = String(req.body.source || 'website').trim();

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required.' });
    }

    const id = createId('sub');
    const result = await query(
      `INSERT INTO subscriptions (id, email, source)
       VALUES ($1, $2, $3)
       RETURNING id, email, source, created_at AS "createdAt"`,
      [id, email, source],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

formsRouter.post('/contact-messages', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const message = String(req.body.message || '').trim();

    if (!name || !email.includes('@') || !message) {
      return res.status(400).json({ message: 'Name, valid email and message are required.' });
    }

    const id = createId('msg');
    const result = await query(
      `INSERT INTO contact_messages (id, name, email, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, message, created_at AS "createdAt"`,
      [id, name, email, message],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});
