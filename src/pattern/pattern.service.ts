import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
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

        const savedPattern = await newPattern.save();
        
        // savedPattern._id를 Types.ObjectId로 강제로 캐스팅함.
        // 해당 방법으로 TS의 타입 체킹을 피할 수 있으나, 타입 안정성을 해칠 수 있음.
        // song.patterns.push(savedPattern._id as Types.ObjectId);

        // 명확한 타입 캐스팅
        const patternId: Types.ObjectId = savedPattern._id as Types.ObjectId;

        song.patterns.push(patternId);

        song.save();

        return savedPattern;
    }

    /**
     * TODO
     * [ ]: pattern delete 제작(Song Schema의 patterns도 변경해야함)
     */

    async deletePattern(id) {
        const pattern = await this.patternModel.findById(id);

        // updateOne은 일치하는 문서가 없을 때에는 아무것도 하지 않으며, 일치하는 문서가 있을 때에만 업데이트함
        await this.songModel.updateOne(
            { _id: pattern.song },
            { $pull: {patterns: pattern._id}} 
        );

        await this.patternModel.findByIdAndDelete(id);
    }
}
