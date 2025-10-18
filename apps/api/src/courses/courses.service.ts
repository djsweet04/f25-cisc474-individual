import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CourseDTO } from '@repo/api/dto/course.dto';
import { CreateCourseDTO, UpdateCourseDTO } from '@repo/api/dto/course-mutation.dto';

@Injectable()
export class CoursesService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.course.findMany();
    }

    async findOne(cuid: string) {
        const course = await this.prisma.course.findUnique({
            where: { course_cuid: cuid },
        });
        if (!course) throw new NotFoundException(`Course with ID ${cuid} not found`);
        return course;
    }

    async findAssignments(course_cuid: string) {
    const course = await this.prisma.course.findUnique({
      where: { course_cuid },
      include: { assignments: true },
    });
    return course?.assignments ?? [];
  }

  //New methods using CourseDTO
  async getAllCourses(): Promise<CourseDTO[]> {
    const courses = await this.prisma.course.findMany();
    return courses.map(course => ({
      course_cuid: course.course_cuid,
      title: course.title,
      syllabus: course.syllabus,
    }));
  }

  async getCourseByCuid(cuid: string): Promise<CourseDTO | null> {
    const course = await this.prisma.course.findUnique({
      where: { course_cuid: cuid },
    });
    if (!course) return null;
    return{
      course_cuid: course.course_cuid,
      title: course.title,
      syllabus: course.syllabus,
    }
  }

  async createCourse(createCourseDto: CreateCourseDTO): Promise<CourseDTO> {
    const newCourse = await this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        syllabus: createCourseDto.syllabus,
      },
    });
    return {
      course_cuid: newCourse.course_cuid,
      title: newCourse.title,
      syllabus: newCourse.syllabus,
    };
  } 

  async updateCourse(cuid: string, updateCourseDto: UpdateCourseDTO): Promise<CourseDTO> {
    const updatedCourse = await this.prisma.course.update({
      where: { course_cuid: cuid },
      data: {
        title: updateCourseDto.title,
        syllabus: updateCourseDto.syllabus,
      },
    });
    return {
      course_cuid: updatedCourse.course_cuid,
      title: updatedCourse.title,
      syllabus: updatedCourse.syllabus,
    };
  }

  async deleteCourse(cuid: string): Promise<void> {
    await this.prisma.course.delete({
      where: { course_cuid: cuid },
    });
  }
}
