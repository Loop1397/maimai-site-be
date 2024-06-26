import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './schemas/song.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class SongService {
    constructor(
        @InjectModel(Song.name)
        private songModel: Model<Song>
    ) {}

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

    async createSong(body: any) {
        const { title, artist, bpm, genre} = body;
        console.log(body);

        // 동일한 노래 이름과 난이도를 가진 도큐먼트가 있는지 확인
        // https://progdev.tistory.com/29
        const isSongExist = await this.songModel.findOne({title});

        if(isSongExist) {
            throw new UnauthorizedException('이미 DB에 존재하는 노래입니다!');
        }

        const song = await this.songModel.create({
            title,
            artist,
            bpm,
            genre,
        });

        return song;
    }
}
