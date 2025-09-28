import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProblemsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.problem.findMany();
    }

    async findOne(id: number) {
        const problem = await this.prisma.problem.findUnique({
            where: { id },
        });
        if (!problem) throw new NotFoundException(`Problem with ID ${id} not found`);
        return problem;
    }
}
