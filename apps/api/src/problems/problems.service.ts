import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProblemsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.problem.findMany();
    }

    async findOne(cuid: string) {
        const problem = await this.prisma.problem.findUnique({
            where: { problem_cuid: cuid },
        });
        if (!problem) throw new NotFoundException(`Problem with ID ${cuid} not found`);
        return problem;
    }
}
