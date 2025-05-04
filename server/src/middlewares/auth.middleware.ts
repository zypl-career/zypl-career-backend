import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../util/index.js';
import { UserModel } from '../user/_db/model/index.js';
import { UserRepository } from '../user/_db/repository/index.js';
import { EnumRoles } from '../user/type/index.js';
import { UserFastRepository } from '../user-fast/_db/repository/index.js';

interface AuthenticatedRequest extends Request {
  user?: UserModel;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFastRepository: UserFastRepository,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const verifyAuthToken = verifyToken(token);

    if ('error' in verifyAuthToken && verifyAuthToken.error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    if ('id' in verifyAuthToken) {
      const email = req.body?.email;

      if (email) {
        const user = await this.userRepository.findOneBy({ email: email });

        if (!user) {
          const userFast = await this.userFastRepository.findOneBy({ id: verifyAuthToken.id });

          if (!userFast) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
          }
          next();
        }

        if (user.role !== EnumRoles.admin || verifyAuthToken.email !== email) {
          return res.status(401).json({ message: 'Unauthorized: Invalid token or email' });
        }
      }

      const user = await this.userRepository.findOneBy({ id: verifyAuthToken.id });

      if (!user) {
        const userFast = await this.userFastRepository.findOneBy({ id: verifyAuthToken.id });

        if (userFast) {
          return next();
        }

        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      req.user = user;
    } else {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    next();
  }
}
