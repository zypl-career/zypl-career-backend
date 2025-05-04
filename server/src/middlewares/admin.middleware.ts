import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EnumRoles } from '../user/type/index.js';
import { UserModel } from '../user/_db/model/index.js';
import { verifyToken } from '../util/index.js';
import { UserRepository } from '../user/_db/repository/index.js';

interface AuthenticatedRequest extends Request {
  user?: UserModel;
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const verifyAdminToken = verifyToken(token);

    if ('error' in verifyAdminToken && verifyAdminToken.error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    if ('id' in verifyAdminToken) {
      const user = await this.userRepository.findOneBy({ id: verifyAdminToken.id });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized: User not found' });
      }

      if (user.role !== EnumRoles.admin) {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    next();
  }
}
