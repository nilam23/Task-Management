import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // creating the application instance
  const app = await NestFactory.create(AppModule);

  // running the server and listening on a port
  await app.listen(3000);
}
bootstrap();
