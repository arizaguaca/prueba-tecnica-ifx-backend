import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env';
import { AppError } from './error-handler';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new AppError('No token provided. Access denied.', 401, 'Unauthorized'));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token.', 401, 'Unauthorized'));
  }
};
