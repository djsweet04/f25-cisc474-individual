import { Controller, Get, Param, ParseIntPipe, Body, Delete, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDTO } from '@repo/api/dto/course.dto';
import { CreateCourseDTO, UpdateCourseDTO, DeleteCourseDTO } from '@repo/api/dto/course-mutation.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    async findAll(): Promise<CourseDTO[]> {
        return this.coursesService.getAllCourses();
    }

    @Get(':cuid')
    async findOne(@Param('cuid') cuid: string): Promise<CourseDTO | null> {
        return this.coursesService.getCourseByCuid(cuid);
    }

    @Get(':cuid/assignments')
    async getAssignments(@Param('cuid') cuid: string) {
        return this.coursesService.findAssignments(cuid);
   }

   @Post()
   async createCourse(@Body() createCourseDto: CreateCourseDTO): Promise<CourseDTO> {
       return this.coursesService.createCourse(createCourseDto);
   }

    @Put(':cuid')
    async updateCourse(
        @Param('cuid') cuid: string,
        @Body() updateCourseDto: UpdateCourseDTO,
    ): Promise<CourseDTO> {
        return this.coursesService.updateCourse(cuid, updateCourseDto);
    }

    @Delete(':cuid')
    async deleteCourse(@Param('cuid') cuid: string): Promise<void> {
        return this.coursesService.deleteCourse(cuid);
    }
}
