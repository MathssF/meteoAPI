import { NestFactory } from '@nestjs/core';
import { AppModule } from './modulos/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MeteoAPI').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
