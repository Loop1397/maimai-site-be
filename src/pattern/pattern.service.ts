import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pattern } from './schemas/pattern.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from 'src/song/schemas/song.schema';

@Injectable()
export class PatternService {
    constructor(
        @InjectModel(Pattern.name)
        private patternModel: Model<Pattern>,
        @InjectModel(Song.name)
        private songModel: Model<Song>,
    ) {}

    async createPattern(body) {
        const { songId, difficulty, level, constant, patterner, type, version } = body;
        const song = await this.songModel.findById(songId);

        if(!song) {
            throw new NotFoundException('해당 id에 맞는 노래가 존재하지 않습니다!')
        }

        const newPattern = new this.patternModel({
            difficulty,
            level,
            constant,
            patterner,
            type,
            version,
            song: song._id,
        });
        return newPattern.save();
    }
}
