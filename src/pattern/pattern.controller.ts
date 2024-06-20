import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { UpdatePatternDto } from './dto/update-pattern.dto';

@Controller('pattern')
export class PatternController {
    constructor(
        private readonly patternService: PatternService
    ) {}

    
    /**
     * TODO
     * [ ] : createPatternDto 제작
     * [ ] : getPatternById 제작
     * [ ] : getAllPatterns 제작
     */

    @Post()
    async createPattern(@Body() body) {
        return await this.patternService.createPattern(body);
    }

    @Patch(':id')
    async updatePattern(@Param('id') id, @Body() updatePatternDto: UpdatePatternDto) {
        console.log(updatePatternDto)
        return await this.patternService.updatePattern(id, updatePatternDto);
    }

    @Delete(':id')
    async deletePattern(@Param('id') id) {
        return await this.patternService.deletePattern(id);
    }
}
