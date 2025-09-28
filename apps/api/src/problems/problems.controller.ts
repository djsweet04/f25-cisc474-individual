import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
    constructor(private readonly problemsService: ProblemsService) {}

    @Get()
    findAll() {
        return this.problemsService.findAll();
    }

    @Get(':cuid')
    findOne(@Param('cuid') cuid: string) {
        return this.problemsService.findOne(cuid);
    }
}
