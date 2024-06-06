import { Controller, Get } from '@nestjs/common';

@Controller('songs')
export class SongsController {

    @Get()
    getAllSongs(): string {
        return 'This will action returns all songs';
    }
    
}
