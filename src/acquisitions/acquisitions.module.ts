import { Module } from '@nestjs/common';
import { AcquisitionsController } from './acquisitions.controller';
import { AcquisitionsService } from './acquisitions.service';

@Module({
  controllers: [AcquisitionsController],
  providers: [AcquisitionsService],
  exports: [AcquisitionsService], // Necessário se for usado em outro módulo
})
export class AcquisitionsModule {}
