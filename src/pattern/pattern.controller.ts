import { Body, Controller, Post } from '@nestjs/common';
import { PatternService } from './pattern.service';

@Controller('pattern')
export class PatternController {
    constructor(
        private readonly patternService: PatternService
    ) {}

    @Post()
    async create(@Body() body) {
        return this.patternService.createPattern(body);
    }
}
