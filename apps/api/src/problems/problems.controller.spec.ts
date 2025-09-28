import { Test, TestingModule } from '@nestjs/testing';
import { ProblemsController } from './problems.controller';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('ProblemsController', () => {
  let controller: ProblemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProblemsController],
    }).compile();

    controller = module.get<ProblemsController>(ProblemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
