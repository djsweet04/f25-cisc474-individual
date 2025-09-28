import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.student.findMany();   // Return all users
  }

  async findOne(cuid: string) {
    const student = await this.prisma.student.findUnique({
      where: { student_cuid: cuid },
    });
    if (!student) throw new NotFoundException(`Student with ID ${cuid} not found`);
    return student;
  }
}