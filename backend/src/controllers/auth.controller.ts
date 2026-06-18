import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import catchAsync from '../utils/catch-async';
import AppError from '../utils/app-error';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  const existingUser = await userService.findUserByEmail(email);
  if (existingUser) {
    return next(new AppError('Email already in use', 400));
  }

  const passwordHash = await authService.hashPassword(password);
  const user = await userService.createUser({ name, email, passwordHash });

  const token = authService.generateToken({ id: user.id, email: user.email });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await userService.findUserByEmail(email);
  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const isPasswordCorrect = await authService.comparePassword(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = authService.generateToken({ id: user.id, email: user.email });

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
});
export default { register, login };
