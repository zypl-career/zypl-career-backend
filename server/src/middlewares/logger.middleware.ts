import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const { method, originalUrl } = req;
    const logFilePath = path.join(__dirname, 'logs.txt');

    res.on('finish', () => {
      const { statusCode } = res;
      const endTime = Date.now();
      const duration = endTime - startTime;
      const logMessage = `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} ${duration}ms\n`;

      console.log(logMessage);

      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error('Failed to write log to file:', err);
        }
      });
    });

    next();
  }
}
