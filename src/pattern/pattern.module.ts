import { Module } from '@nestjs/common';
import { PatternController } from './pattern.controller';
import { PatternService } from './pattern.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pattern, patternSchema } from './schemas/pattern.schema';
import { Song, songSchema } from 'src/song/schemas/song.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Pattern.name, 
    schema: patternSchema}]),
  MongooseModule.forFeature([{
    name: Song.name, 
    schema: songSchema
  }])
],
  controllers: [PatternController],
  providers: [PatternService]
})
export class PatternModule {}
