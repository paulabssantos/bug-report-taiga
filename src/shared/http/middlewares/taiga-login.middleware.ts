import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login } from '../api/api-taiga';

@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if(!req.cookies['taiga-token']){
        const token = await login()
        res.cookie('taiga-token',token)
    }
    next();
  }
}