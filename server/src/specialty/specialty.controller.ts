import { Controller } from '@nestjs/common';

import { SpecialtyService } from './specialty.service.js';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}
}
