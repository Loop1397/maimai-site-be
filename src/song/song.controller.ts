import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
    constructor(
        private readonly songService: SongService
    ) {}

    @Get()
    getAllSongs(): string {
        return 'This will action returns all songs';
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
