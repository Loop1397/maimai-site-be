import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';

@Controller('pattern')
export class PatternController {
    constructor(
        private readonly patternService: PatternService
    ) {}

    @Post()
    async createPattern(@Body() body) {
        return this.patternService.createPattern(body);
    }

    @Patch(':id')
    async updatePattern(@Body() body) {

    }

    @Delete(':id')
    async deletePattern(@Param('id') id) {
        return this.patternService.deletePattern(id);
    }
}
