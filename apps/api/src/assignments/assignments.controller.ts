import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
    constructor(private readonly assignmentsService: AssignmentsService) {}

    @Get()
    findall() {
        return this.assignmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.assignmentsService.findOne(id);
    }
}
