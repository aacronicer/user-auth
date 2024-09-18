import e, { Router } from 'express';
import { registerController, loginController, refreshTokenController } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

export const authRoutes = Router();

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.post('/refresh', refreshTokenController);
authRoutes.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route accessed' });
});

authRoutes.get('/',async (req, res) => {
  res.json({ message: 'This is auth route' });
});

export default authRoutes;