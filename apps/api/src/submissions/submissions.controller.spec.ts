import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsController } from './submissions.controller';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('SubmissionsController', () => {
  let controller: SubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionsController],
    }).compile();

    controller = module.get<SubmissionsController>(SubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
