import { Module } from '@nestjs/common';
import { DataStoreService } from '../datastore/datastore.service';
import { AcquisitionsController } from './acquisitions.controller';
import { AcquisitionsService } from './acquisitions.service';

@Module({
  controllers: [AcquisitionsController],
  providers: [AcquisitionsService, DataStoreService],
  exports: [AcquisitionsService, DataStoreService],
})
export class AcquisitionsModule {}
