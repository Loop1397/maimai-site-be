import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongModule } from './song/song.module';
import { MongooseModule } from '@nestjs/mongoose';
// @nestjs/config : 환경변수를 사용하기 위한 패키지. 내부적으로는 dotenv를 쓴다고 함 
import { ConfigModule } from '@nestjs/config';
import { PatternModule } from './pattern/pattern.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    SongModule,
    PatternModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
