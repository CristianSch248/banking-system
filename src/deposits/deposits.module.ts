import { Module } from '@nestjs/common';
import { DataStoreService } from '../datastore/datastore.service';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';

@Module({
  controllers: [DepositsController],
  providers: [DepositsService, DataStoreService],
  exports: [DepositsService, DataStoreService],
})
export class DepositsModule {}
