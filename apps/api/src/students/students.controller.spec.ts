import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
