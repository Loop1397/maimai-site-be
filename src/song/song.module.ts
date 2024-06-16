import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, songSchema } from './schemas/song.schema';
import { Pattern, patternSchema } from 'src/pattern/schemas/pattern.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Song.name, 
    schema: songSchema
  }]),
  MongooseModule.forFeature([{
    name: Pattern.name, 
    schema: patternSchema}])
],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
