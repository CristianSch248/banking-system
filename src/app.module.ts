import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepositsModule } from './deposits/deposits.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AcquisitionsModule } from './acquisitions/acquisitions.module';

@Module({
  imports: [UserModule, DepositsModule, AcquisitionsModule], 
  
  controllers: [
    AppController,
    UserController
  ], 
  providers: [
    AppService, 
  ],
})
export class AppModule {}
