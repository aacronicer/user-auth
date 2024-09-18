import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../models/prismaClient';
import { generateAccessToken, generateRefreshToken } from '../services/tokenService';
import jwt from 'jsonwebtoken';
import type authRoutes from '../routes/authRoutes';

export const registerController = async (req: Request, res: Response) => {
    // registration logic...
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(email);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        console.log("registration success");
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

export const loginController = async (req: Request, res: Response) => {
    // login logic...
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
    });

    res.json({ accessToken });
};

export const refreshTokenController = (req: Request, res: Response) => {
    // refresh token logic...
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ error: 'JWT secret not configured' });
    }
    let user;
    try {
        user = jwt.verify(refreshToken, secret);
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
    const accessToken = generateAccessToken((user as jwt.JwtPayload).userId);
    res.json({ accessToken });
};

export const protectedController = (req: Request, res: Response) => {
  res.json({ message: 'Protected route accessed' });
};
