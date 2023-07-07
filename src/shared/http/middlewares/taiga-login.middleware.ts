import { Inject, Injectable, NestMiddleware, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { login } from '../api/api-taiga';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from "cache-manager"
@Injectable()
export class TaigaLoginMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }
  async use(req: Request, @Res() res: Response, next: NextFunction) {
    const taiga_token = await this.cacheManager.get('taiga-token')
    if (!taiga_token) {
      try {
        const login_response = await login()
        await this.cacheManager.set('taiga-token', login_response.auth_token, 100000)
      } catch (error) {
      } finally {
        next()
      }
    } else {
      next();
    }
  }
}