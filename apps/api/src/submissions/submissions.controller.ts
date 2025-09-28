import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
    constructor(private readonly submissionsService: SubmissionsService) {}

    @Get()
    findAll() {
        return this.submissionsService.findAll();
    }

    @Get(':cuid')
    findOne(@Param('cuid') cuid: string) {
        return this.submissionsService.findOne(cuid);
    }
}
