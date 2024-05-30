import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LarkToken } from './config/lark/lark.token';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { SampleMiddleware } from './common/middleware/sample/sample.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception-filter/http-exception-filter.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().setTitle('Lark API テスト').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
