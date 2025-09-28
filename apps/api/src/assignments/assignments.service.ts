import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssignmentsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.assignment.findMany();
    }

    async findOne(id: number) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id },
        });
        if (!assignment) throw new NotFoundException(`Assignment with ID ${id} not found`);
        return assignment;
    }
}
