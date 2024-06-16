import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from './schemas/song.schema';
import { Model } from 'mongoose';

@Injectable()
export class SongService {
    constructor(
        @InjectModel(Song.name)
        private songModel: Model<Song>
    ) {}

    async createSong(body: any) {
        const { songName, artist, bpm, genre} = body;

        // 동일한 노래 이름과 난이도를 가진 도큐먼트가 있는지 확인
        // https://progdev.tistory.com/29
        const isSongExist = await this.songModel.findOne({songName});

        if(isSongExist) {
            throw new UnauthorizedException('이미 DB에 존재하는 노래입니다!');
        }

        const song = await this.songModel.create({
            songName,
            artist,
            bpm,
            genre,
        });

        return song;
    }
}
