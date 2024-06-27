import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { Types } from 'mongoose';

@Controller('song')
export class SongController {
    constructor(
        private readonly songService: SongService
    ) {}

    /**
     * TODO
     * [ ] : createSongDto 제작
     * [ ] : updateSongDto 제작
     * [x] : getSongById 제작
     * [x] : getAllSongs 제작
     */

    @Get()
    getAllSongs() {
        return this.songService.getAllSongs();
    }

    @Get(':songId')
    async getSongById(@Param('songId') songId: Types.ObjectId) {
        return await this.songService.getSongById(songId);
    }

    @Post()
    async createSong(@Body() body: any) {
        return await this.songService.createSong(body);
    }

    @Patch()
    updateSong(): any {
        return ;
    }

    @Delete()
    deleteSong(): any {
        return ;
    }
}
