import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsService } from './submissions.service';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('SubmissionsService', () => {
  let service: SubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionsService],
    }).compile();

    service = module.get<SubmissionsService>(SubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
