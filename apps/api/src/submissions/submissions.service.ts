import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubmissionsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.submission.findMany();
    }

    async findOne(cuid: string) {
        const submission = await this.prisma.submission.findUnique({
            where: { submission_cuid: cuid },
        });
        if (!submission) throw new NotFoundException(`Submission with ID ${cuid} not found`);
        return submission;
    }
}
