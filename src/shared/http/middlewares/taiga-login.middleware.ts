import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login, refreshToken } from '../api/api-taiga';

@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['taiga-refresh'] && req.headers['taiga-refresh'] != 'undefined') {
      const refresh_response = await refreshToken(req.cookies['taiga-refresh'])
      req.headers['taiga-refresh'] = refresh_response.refresh
      req.headers['taiga-token'] = refresh_response.auth_token
    } else {
      const login_response = await login()
      req.headers['taiga-refresh'] = login_response.refresh
      req.headers['taiga-token'] = login_response.auth_token
    }
    next();
  }
}