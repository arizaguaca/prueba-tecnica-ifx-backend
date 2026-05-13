import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { config } from '../../config/env';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as any,
  });
};

export const sendTokenInCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production', // true in production (HTTPS)
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  });
};
