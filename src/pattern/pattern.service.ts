import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Pattern } from './schemas/pattern.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from 'src/song/schemas/song.schema';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { CreatePatternDto } from './dto/create-pattern.dto';

@Injectable()
export class PatternService {
    constructor(
        @InjectModel(Pattern.name)
        private patternModel: Model<Pattern>,
        @InjectModel(Song.name)
        private songModel: Model<Song>,
    ) {}

    /**
     * TODO
     * [x] : getAllPatterns와 getPatternById 제작
     * [ ] : song외래키를 통해 song의 정보까지 가져오는 메소드 제작
     */

    async getAllPatterns() {
        return this.patternModel.find({});
    }

    async getPatternById(patternId: Types.ObjectId) {
        const pattern = await this.patternModel.findById(patternId);

        // 해당 patternId에 맞는 패턴이 발견되지 않을 시
        if(!pattern) {
            throw new NotFoundException('해당 Id에 맞는 패턴이 발견되지 않았습니다!');
        }

        const song = await this.songModel
            .findById(pattern.song)
            .populate('song')
            .exec();

        console.log(song);

        // const song = await this.songModel.findById(pattern.songId)

        // console.log("#########################\nsong: ", song);

        return pattern;
    }

    async createPattern(createPatternDto: CreatePatternDto) {
        const { difficulty, level, constant, patterner, type, version, song }: {difficulty: string, level: string, constant?: number, patterner?: string, type: string, version: string, song: Types.ObjectId} = createPatternDto;
        const foundedSong = await this.songModel.findById(song);

        if(!foundedSong) {
            throw new NotFoundException('해당 id에 맞는 노래가 존재하지 않습니다!')
        }

        console.log(createPatternDto);
        const newPattern = new this.patternModel({
            difficulty,
            level,
            constant,
            patterner,
            type,
            version,
            song
        }); 

        const savedPattern = await newPattern.save();
        
        // savedPattern._id를 Types.ObjectId로 강제로 캐스팅함.
        // 해당 방법으로 TS의 타입 체킹을 피할 수 있으나, 타입 안정성을 해칠 수 있음.
        // song.patterns.push(savedPattern._id as Types.ObjectId);

        // 명확한 타입 캐스팅
        const patternId: Types.ObjectId = savedPattern._id as Types.ObjectId;

        foundedSong.patterns.push(patternId);

        foundedSong.save();

        return savedPattern;
    }

    async updatePattern(patternId, updatePatternDto: UpdatePatternDto) {
        const updateFields = updatePatternDto;

        const updatedPattern = this.patternModel.findByIdAndUpdate(
            {_id: patternId},
            { $set: updateFields},
            // new: true 옵션을 사용하면 업데이트된 문서를 반환받음
            // 만약 new: false라면 업데이트 되기 전의 문서를 반환받음
            { new:true, useFindAndModify: false}
        );

        if(!updatedPattern) {
            throw new NotFoundException('업데이트된 pattern을 찾을 수 없습니다!')
        }

        return updatedPattern;
    }

    async deletePattern(patternId: Types.ObjectId) {
        const pattern = await this.patternModel.findById(patternId);

        // updateOne은 일치하는 문서가 없을 때에는 아무것도 하지 않으며, 일치하는 문서가 있을 때에만 업데이트함
        await this.songModel.updateOne(
            { _id: pattern.song },
            { $pull: {patterns: pattern._id}} 
        );

        await this.patternModel.findByIdAndDelete(patternId);
    }
}
