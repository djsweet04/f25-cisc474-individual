import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [LinksModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
