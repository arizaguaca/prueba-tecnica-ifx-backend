import { Request, Response, NextFunction } from 'express';
import { AppError } from './error-handler';

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return next(new AppError('No user found in request', 500, 'Internal Server Error'));
    }

    if (!roles.includes(user.role)) {
      return next(
        new AppError(
          `Access denied. Your role (${user.role}) does not have permission.`,
          403,
          'Forbidden',
        ),
      );
    }

    next();
  };
};
