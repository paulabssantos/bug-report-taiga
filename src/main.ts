import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger_config } from './config/swagger';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('swagger', app, document);
  
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
