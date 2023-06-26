import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login, refreshToken } from '../api/api-taiga';

@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies['taiga-refresh'] && req.cookies['taiga-refresh'] != 'undefined') {
      const refresh_response = await refreshToken(req.cookies['taiga-refresh'])
      res.cookie('taiga-refresh',refresh_response.refresh)
      res.cookie('taiga-token',refresh_response.auth_token)
    }
     else {
      const login_response = await login()
      res.cookie('taiga-refresh',login_response.refresh)
      res.cookie('taiga-token',login_response.auth_token)
    }
    next();
  }
}