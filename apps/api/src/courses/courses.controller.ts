import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':cuid')
    findOne(@Param('cuid') cuid: string) {
        return this.coursesService.findOne(cuid);
    }
}
