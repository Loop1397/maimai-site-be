import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('songs')
export class SongController {

    @Get()
    getAllSongs(): string {
        return 'This will action returns all songs';
    }

    @Post()
    createNewSong(): any {
        return ;
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
