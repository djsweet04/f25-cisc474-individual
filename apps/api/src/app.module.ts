import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { PrismaService } from './prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [LinksModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
