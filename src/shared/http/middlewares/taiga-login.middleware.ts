import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login, refreshToken } from '../api/api-taiga';
import { TaigaException } from 'src/shared/errors/taiga-exception';
import * as dayjs from 'dayjs'

@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies['taiga-token-expiration'] || dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).diff(req.cookies['taiga-token-expiration'], 'minutes', true) >= 4) {
      try {
        const refresh_response = await refreshToken(req.cookies['taiga-refresh'])
        res.cookie('taiga-refresh', refresh_response.refresh)
        res.cookie('taiga-token', refresh_response.auth_token)
        res.cookie('taiga-token-expiration', dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).add(4, 'minute'))
      } catch (error) {
        try {
          const login_response = await login()
          res.cookie('taiga-refresh', login_response.refresh)
          res.cookie('taiga-token', login_response.auth_token)
          res.cookie('taiga-token-expiration', dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).add(4, 'minute'))
        } catch (error) {
        }
      } finally {
        next()
      }
    } else {
      next();
    }
  }
}