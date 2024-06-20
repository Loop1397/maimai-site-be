import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { Types } from 'mongoose';

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
    async createPattern( @Body() createPatternDto: CreatePatternDto) {
        return await this.patternService.createPattern( createPatternDto);
    }

    @Patch(':patternId')
    async updatePattern(@Param('patternId') patternId: Types.ObjectId, @Body() updatePatternDto: UpdatePatternDto) {
        console.log(updatePatternDto)
        return await this.patternService.updatePattern(patternId, updatePatternDto);
    }

    @Delete(':patternId')
    async deletePattern(@Param('patternId') patternId: Types.ObjectId) {
        return await this.patternService.deletePattern(patternId);
    }
}
