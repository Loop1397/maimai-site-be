import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, songSchema } from './song.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Song.name, schema: songSchema}])],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
