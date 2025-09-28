import { Test, TestingModule } from '@nestjs/testing';
import { ProblemsService } from './problems.service';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('ProblemsService', () => {
  let service: ProblemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemsService],
    }).compile();

    service = module.get<ProblemsService>(ProblemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
