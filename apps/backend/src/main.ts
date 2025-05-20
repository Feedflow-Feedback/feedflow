import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // specify the allowed HTTP methods
    credentials: true, // enable credentials (cookies, authorization headers)
  });
  await app.listen(3300);
}
bootstrap();
