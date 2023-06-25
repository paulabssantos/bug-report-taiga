import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login, refreshToken } from '../api/api-taiga';

@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
      await refreshToken(req.cookies['taiga-refresh']).then((data)=>{
        res.cookie('taiga-token',data.auth_token)
      }).catch(async ()=>{
        const login_response = await login()
        res.cookie('taiga-refresh',login_response.refresh)
        res.cookie('taiga-token',login_response.auth_token)
      })
      next();
    }
}