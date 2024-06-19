import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';

@Controller('pattern')
export class PatternController {
    constructor(
        private readonly patternService: PatternService
    ) {}

    @Post()
    async createPattern(@Body() body) {
        return await this.patternService.createPattern(body);
    }

    /**
     * TODO
     * [ ] : 제대로 된 데이터가 들어왔는지 확인해야함
     */
    @Patch(':id')
    async updatePattern(@Param('id') id, @Body() body) {
        console.log(body)
        return await this.patternService.updatePattern(id, body);
    }

    @Delete(':id')
    async deletePattern(@Param('id') id) {
        return await this.patternService.deletePattern(id);
    }
}
