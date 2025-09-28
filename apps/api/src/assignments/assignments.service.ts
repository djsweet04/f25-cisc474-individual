import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AssignmentsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.assignment.findMany();
    }

    async findOne(cuid: string) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { assignment_cuid: cuid },
        });
        if (!assignment) throw new NotFoundException(`Assignment with ID ${cuid} not found`);
        return assignment;
    }
}
