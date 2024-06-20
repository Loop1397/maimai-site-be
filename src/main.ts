import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class-validator패키지를 글로벌 파이프로 등록
  app.useGlobalPipes(new ValidationPipe({
    // DTO클래스에서 유효성 검사 데코레이터가 없는 속성을 제거하는 옵션
    whitelist: true,
    // 유효성 검사기가 허용되지 않은 속성을 제거하는 대신 예외를 발생시키게 되는 옵션 
    forbidNonWhitelisted: true
  })); 
  await app.listen(5000);
}
bootstrap();
