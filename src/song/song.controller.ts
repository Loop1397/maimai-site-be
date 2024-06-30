import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SongService } from './song.service';
import { Types } from 'mongoose';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';

@Controller('song')
export class SongController {
    constructor(
        private readonly songService: SongService
    ) {}

    /**
     * TODO
     * [x] : createSongDto 제작
     * [x] : updateSongDto 제작
     * [x] : getSongById 제작
     * [x] : getAllSongs 제작
     * [ ] : updateSong 제작
     * [ ] : deleteSong 제작
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
    async createSong(@Body() createSongDto: CreateSongDto) {
        return await this.songService.createSong(createSongDto);
    }

    @Patch(':songId')
    async updateSong(@Param('songId') songId: Types.ObjectId, @Body() updateSongDto: UpdateSongDto) {
        return await this.songService.updateSong(songId, updateSongDto);
    }

    @Delete(':sondId')
    async deleteSong(@Param('songId') songId: Types.ObjectId) {
        return await this.songService.deleteSong(songId);
    }
}
