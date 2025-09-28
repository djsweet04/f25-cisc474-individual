import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.submission.findMany();
    }

    async findOne(id: number) {
        const submission = await this.prisma.submission.findUnique({
            where: { id },
        });
        if (!submission) throw new NotFoundException(`Submission with ID ${id} not found`);
        return submission;
    }
}
