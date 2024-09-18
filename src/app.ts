import express from 'express';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/authRoutes';

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.use('/auth', authRoutes);

export default app;
