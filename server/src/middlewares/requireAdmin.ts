import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-admin-token');
    if (token !== env.adminToken) {
        return res.status(401).json({ message: 'Admin token is missing or invalid.' });
    }
    next();
};
