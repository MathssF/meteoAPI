import { NestFactory } from '@nestjs/core';
import { AppModule } from './modulos/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const n: string = process.env.NAME || '';
const u: string = process.env.URL || '';
const m: string = process.env.EMAIL || '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MeteoAPI')
    .setDescription('Uma API que confere a meteomatics, salva os dados na persistência, e apresenta outras funcionalidades!')
    .setContact(n, u, m)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
