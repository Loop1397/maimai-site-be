import { Module } from '@nestjs/common';
import { PatternController } from './pattern.controller';
import { PatternService } from './pattern.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pattern, patternSchema } from './pattern.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Pattern.name, 
    schema: patternSchema}])],
  controllers: [PatternController],
  providers: [PatternService]
})
export class PatternModule {}
