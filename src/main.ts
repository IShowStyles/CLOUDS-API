import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const PORT = process.env.PORT;
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../cert/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../cert/server.cert')),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Clouds example')
    .setDescription('The clouds API description')
    .setVersion('1.0')
    .addTag('clouds')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
}

bootstrap();
