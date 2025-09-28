import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) {}

    @Get()
    findall() {
        return this.submissionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.submissionsService.findOne(id);
    }
}
