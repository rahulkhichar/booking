import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unexpected properties
      forbidNonWhitelisted: true, // throw error on unknown props
      transform: true, // auto-transform types (e.g. string -> number)
    }),
  );

  const globalPrefix = 'user/api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3010;

  // app.useBodyParser('json', { limit: '50mb' });
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
