import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
     * [x] : song외래키를 통해 song의 정보까지 가져오도록 작성
     * [x] : getAllPatterns시에도 song의 정보를 가져오도록 작성 - pattern내부에 song의 _id가 아닌 해당 song의 정보(title, artist, bpm, genre)를 직접 저장하도록 바꿔서 해결
     */

    async getAllPatterns() {
        return this.patternModel.find({});
    }

    async getPatternById(patternId: Types.ObjectId) {
        const foundedPattern = await this.patternModel.findById(patternId);

        // 해당 patternId에 맞는 패턴이 발견되지 않을 시
        if(!foundedPattern) {
            throw new NotFoundException('해당 Id에 맞는 패턴이 발견되지 않았습니다!');
        }

        /*
        // populate: 참조중인 외부 도큐먼트를 가져오는 메소드
        await foundedPattern.populate({
            // path: 외부 도큐먼트를 가져올(populate) 필드를 지정하는 옵션
            path:'song',
        });
        */

        return foundedPattern;
    }

    async createPattern(createPatternDto: CreatePatternDto) {
        const { difficulty, level, constant, patterner, type, version, song }: {difficulty: string, level: string, constant?: number, patterner?: string, type: string, version: string, song: Types.ObjectId} = createPatternDto;
        
        const songData = await this.getSongData(song);

        const isDuplicated = await this.patternModel.findOne({
            difficulty, 
            type, 
            // 중첩된 객체의 필드를 비교하는 방법
            'song.title': songData.title
        });

        if(isDuplicated) {
            throw new ConflictException('이미 요청한 노래의 해당 난이도&타입에 대한 데이터가 존재합니다')
        }

        const newPattern = new this.patternModel({
            difficulty,
            level,
            constant,
            patterner,
            type,
            version,
            song: songData
        });

        console.log(newPattern);

        const savedPattern = await newPattern.save();
        
        // savedPattern._id를 Types.ObjectId로 강제로 캐스팅함.
        // 해당 방법으로 TS의 타입 체킹을 피할 수 있으나, 타입 안정성을 해칠 수 있음.
        // song.patterns.push(savedPattern._id as Types.ObjectId);

        // 명확한 타입 캐스팅
        const patternId: Types.ObjectId = savedPattern._id as Types.ObjectId;

        await this.songModel.findByIdAndUpdate(
            {_id: patternId},
            { $push: {patterns: patternId}},
            { useFindAndModify: false}
        )

        return savedPattern;
    }

    async updatePattern(patternId: Types.ObjectId, updatePatternDto: UpdatePatternDto) {
        const existingPattern = await this.patternModel.findById(patternId);

        if(!existingPattern) {
            throw new NotFoundException('해당 Id에 맞는 패턴이 발견되지 않았습니다!');
        }

        // 깊은 복사를 위해 객체 생성
        let updateFields: any = {};

        // updatePatternDto의 null이 아닌 필드만을 updateFields로 깊은 복사함 
        Object.keys(updatePatternDto).forEach(key => {
            if (updatePatternDto[key] !== null && updatePatternDto[key] !== undefined) {
                updateFields[key] = updatePatternDto[key];
            }
        });
        
        // 만약 업데이트 되는 항목 중 song이 존재한다면 해당 song(ObjectId)를 바탕으로 songData를 가져온 뒤 updateFields.song에 넣어줌
        if(updateFields.song) {
            updateFields.song = await this.getSongData(updatePatternDto.song);
        }

        const updatedPattern = await this.patternModel.findByIdAndUpdate(
            {_id: patternId},
            { $set: updateFields},
            // new: true 옵션을 사용하면 업데이트된 문서를 반환받음
            // 만약 new: false라면 업데이트 되기 전의 문서를 반환받음
            { new:true, useFindAndModify: false}
        );

        return updatedPattern;
    }

    async deletePattern(patternId: Types.ObjectId) {
        const pattern = await this.patternModel.findById(patternId);

        // updateOne은 일치하는 문서가 없을 때에는 아무것도 하지 않으며, 일치하는 문서가 있을 때에만 업데이트함
        await this.songModel.updateOne(
            { title : pattern.song.title },
            { $pull: {patterns: pattern._id}} 
        );

        await this.patternModel.findByIdAndDelete(patternId);
    }

    async getSongData(song: Types.ObjectId) {
        const songData = await this.songModel
            .findById(song)
            // select: 도큐먼트를 가져올 때 특정 필드만 가져올 수 있게하는 옵션
            // 가져오거나 가져오지 않을 필드는 띄어쓰기로 구분하며, '가져올 필드만 기입'하거나 '가져오지 않은 필드만 기입'해야함(마이너스를 쓸거면 모든 필드에 마이너스를 붙여야함)
            // 만약 '가져올 필드만 기입'하는 경우, _id도 자동으로 딸려옴
            .select('-_id -patterns -createdAt -updatedAt -__v')

        if(!songData) {
            throw new NotFoundException('해당 id에 맞는 노래가 존재하지 않습니다!')
        }

        return songData;
    }
}
