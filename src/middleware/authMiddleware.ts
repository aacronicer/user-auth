import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Token required' });
  
  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: 'JWT secret not configured' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

export default authenticateToken;