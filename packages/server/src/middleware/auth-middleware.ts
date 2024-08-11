import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { verifyToken } from '../util/utils.js';

interface RequestWithUser extends Request {
  user: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const user = verifyToken(token);
      if ((user as any).type === 'refresh') {
        throw new UnauthorizedException('Invalid token');
      }
      req.user = user;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
