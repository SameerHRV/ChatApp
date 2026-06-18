import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env.config';

export class AuthService {
  generateToken(payload: { id: string; email: string; role?: string }): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export const authService = new AuthService();
export default authService;
