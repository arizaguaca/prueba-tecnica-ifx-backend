import { Request, Response, NextFunction } from 'express';
import { generateToken, sendTokenInCookie } from '../../infrastructure/security/jwt';
import { AppError } from '../middlewares/error-handler';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Mock Users Validation
      let user = null;

      if (email === 'admin@ifx.com' && password === '123456') {
        user = { email: 'admin@ifx.com', role: 'Administrador' };
      } else if (email === 'cliente@ifx.com' && password === '123456') {
        user = { email: 'cliente@ifx.com', role: 'Cliente' };
      }

      if (user) {
        const token = generateToken({ id: user.email, email: user.email, role: user.role });
        
        // Adjuntar token a la cookie HttpOnly
        sendTokenInCookie(res, token);

        // Respuesta JSON consistente
        res.status(200).json({
          user: {
            email: user.email,
            role: user.role,
          },
        });
      } else {
        throw new AppError('Credenciales inválidas', 401, 'Unauthorized');
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  }
}
