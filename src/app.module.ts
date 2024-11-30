import { Module } from '@nestjs/common';
import { AcquisitionsController } from './acquisitions/acquisitions.controller';
import { AcquisitionsModule } from './acquisitions/acquisitions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataStoreService } from './datastore/datastore.service';
import { DepositsController } from './deposits/deposits.controller';
import { DepositsModule } from './deposits/deposits.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule, DepositsModule, AcquisitionsModule], 
  
  controllers: [
    AppController,
    UserController,
    AcquisitionsController,
    DepositsController
  ], 
  providers: [
    AppService,
    DataStoreService, 
  ],
})
export class AppModule {}
