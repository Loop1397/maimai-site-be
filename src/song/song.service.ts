import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './schemas/song.schema';
import { Model, Types } from 'mongoose';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';

@Injectable()
export class SongService {
    constructor(
        @InjectModel(Song.name)
        private songModel: Model<Song>
    ) {}

    async getAllSongs() {
        const allSongs = await this.songModel.aggregate([
            { 
                $lookup: {
                  from: 'pattern',
                  localField: 'patterns',
                  foreignField: '_id',
                  as: 'patternDetails'
                }
            },
            {
                $project: {
                    patternDetails: {
                        _id:0,
                        song:0,
                        createdAt:0,
                        updatedAt:0,
                        __v:0
                    }
                }
            }
        ]).exec();

        return allSongs;
    }

    /**
     * TODO
     * [x] : getSongById에서 populate가 제대로 적용되지 않는 문제 해결 - populate대신 aggregate로 일단 해결함
     */

    async getSongById(songId: Types.ObjectId) {
        const song = await this.songModel.aggregate([
            { $match: { _id: new Types.ObjectId(songId) } },
            { 
                $lookup: {
                  from: 'pattern',
                  localField: 'patterns',
                  foreignField: '_id',
                  as: 'patternDetails'
                }
            },
            {
                $project: {
                    patternDetails: {
                        _id:0,
                        song:0,
                        createdAt:0,
                        updatedAt:0,
                        __v:0
                    }
                }
            }
        ]).exec();

        // 해당 songId에 맞는 패턴이 발견되지 않을 시
        if(!song.length) {
            throw new NotFoundException('해당 Id에 맞는 노래가 발견되지 않았습니다!');
        }

        // await foundedSong.populate({
        //     // path: 외부 도큐먼트를 가져올(populate) 필드를 지정하는 옵션
        //     path:'patterns',
        // });

        return song[0];
    }

    async createSong(createSongDto: CreateSongDto) {
        // 노래 제목이 unique한 값이라 제목만 검사하면 됨
        // https://progdev.tistory.com/29
        const isSongExist = await this.songModel.findOne({title: createSongDto.title});

        if(isSongExist) {
            throw new UnauthorizedException('이미 DB에 존재하는 노래입니다!');
        }

        const song = await this.songModel.create(createSongDto);

        return song;
    }

    async updateSong(updateSongDto: UpdateSongDto) {

    }

    async deleteSong(songId: Types.ObjectId) {
        
    }
}
