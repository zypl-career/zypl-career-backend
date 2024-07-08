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
  /**
   * AuthMiddleware is a middleware that verifies the token in the authorization header of the request.
   * If the token is valid, it sets the user object in the request and allows the request to proceed.
   * If the token is missing or invalid, it throws an UnauthorizedException.
   *
   * @param req The request object containing the headers and the body.
   * @param res The response object that sends the HTTP response back to the client.
   * @param next The callback function that is called to pass the request to the next middleware in the stack.
   */
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
