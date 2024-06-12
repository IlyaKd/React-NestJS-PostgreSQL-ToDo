import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(RootModule);

  app.setGlobalPrefix('/api');

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addBasicAuth()
    .addBearerAuth()
    .addOAuth2()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
