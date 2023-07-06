import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login, refreshToken } from '../api/api-taiga';
import * as dayjs from 'dayjs'

@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies['taiga-token-expiration']) {
      try {
        const login_response = await login()
        res.cookie('taiga-refresh', login_response.refresh)
        res.cookie('taiga-token', login_response.auth_token)
        res.cookie('taiga-token-expiration', dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).add(10, 'minute'))
      } catch (error) {
      } finally {
        next()
      }
    }
    else if (dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).diff(req.cookies['taiga-token-expiration'], 'minutes', true) >= 10) {
      try {
        const refresh_response = await refreshToken(req.cookies['taiga-refresh'])
        res.cookie('taiga-refresh', refresh_response.refresh)
        res.cookie('taiga-token', refresh_response.auth_token)
        res.cookie('taiga-token-expiration', dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).add(10, 'minute'))
      } catch (error) {
        if (error.response.status != 429) {
          try {
            const login_response = await login()
            res.cookie('taiga-refresh', login_response.refresh)
            res.cookie('taiga-token', login_response.auth_token)
            res.cookie('taiga-token-expiration', dayjs(dayjs().format("YYYY-MM-DDTHH:mm:ss-00:00")).add(10, 'minute'))
          } catch (error) {
          }
        }
      } finally {
        next()
      }
    } else {
      next();
    }
  }
}