import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const logger = new Logger('Main')

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(ENV.PORT);

  logger.log(`Client Gateway running on port ${ENV.PORT}`)
}

bootstrap();
