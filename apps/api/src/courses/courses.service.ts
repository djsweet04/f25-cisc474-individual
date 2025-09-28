import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
}
