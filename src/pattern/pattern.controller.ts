import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';
import { UpdatePatternDto } from './dtos/update-pattern.dto';
import { CreatePatternDto } from './dtos/create-pattern.dto';
import { Types } from 'mongoose';

@Controller('pattern')
export class PatternController {
    constructor(
        private readonly patternService: PatternService
    ) {}

    
    /**
     * TODO
     * [x] : createPatternDto 제작
     * [x] : getPatternById 제작
     * [x] : getAllPatterns 제작
     */

    @Get()
    async getAllPatterns() {
        return await this.patternService.getAllPatterns();
    }

    @Get(':patternId')
    async getPatternById(@Param('patternId') patternId: Types.ObjectId) {
        return await this.patternService.getPatternById(patternId);
    }

    @Post()
    async createPattern( @Body() createPatternDto: CreatePatternDto) {
        return await this.patternService.createPattern(createPatternDto);
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
