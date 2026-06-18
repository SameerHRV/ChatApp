import { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';
import catchAsync from '../utils/catch-async';
import AppError from '../utils/app-error';

export const getProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError('User context not found in request', 400));
  }

  const user = await userService.findUserById(req.user.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    },
  });
});
