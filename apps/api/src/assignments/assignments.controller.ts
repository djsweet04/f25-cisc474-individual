import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) {}

    @Get()
    findall() {
        return this.assignmentsService.findAll();
    }

    @Get(':cuid')
    findOne(@Param('cuid') cuid: string) {
        return this.assignmentsService.findOne(cuid);
    }
}
