import { Module } from '@nestjs/common';
import { AcquisitionsController } from './acquisitions.controller';
import { AcquisitionsService } from './acquisitions.service';

@Module({
  controllers: [AcquisitionsController],
  providers: [AcquisitionsService]
})
export class AcquisitionsModule {}
