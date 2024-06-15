import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pattern } from './pattern.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PatternService {
    constructor(
        @InjectModel(Pattern.name)
        private patternModel: Model<Pattern>
    ) {}
}
