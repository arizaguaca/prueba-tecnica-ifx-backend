import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public error: string = 'Bad Request',
  ) {
    super(message);
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const errorName = err instanceof AppError ? err.error : 'Internal Server Error';

  res.status(statusCode).json({
    error: errorName,
    message: err.message,
  });
};
