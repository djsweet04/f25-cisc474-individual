import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { PrismaService } from './prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ProblemsModule } from './problems/problems.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [LinksModule, StudentsModule, CoursesModule, AssignmentsModule, ProblemsModule, SubmissionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
