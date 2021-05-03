import { ValidatePipe } from './pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    //Swager-documentation config
    const config = new DocumentBuilder()
        .setTitle('NeoflexPortal - prototype')
        .setDescription('Документация REST API')
        .setVersion('0.0.1')
        .addTag('react-nodejs-nest-docer')
        .build()
    const documentation = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, documentation);

    app.useGlobalPipes(new ValidatePipe())

    await app.listen(PORT, ()=>console.log('listen port =', PORT));
}
start();