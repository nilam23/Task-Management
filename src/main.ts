import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // creating the application instance
  const app = await NestFactory.create(AppModule);

  // running the server and listening on a port
  const PORT = process.env.DEV_PORT || 3000;
  await app.listen(PORT);

  // adding logger
  const logger = new Logger('bootstrap');
  logger.log(`Server running on port ${PORT}`);
}
bootstrap();
