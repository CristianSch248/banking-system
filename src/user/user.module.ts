import { Module } from '@nestjs/common';
import { DataStoreService } from '../datastore/datastore.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DataStoreService],      
  exports: [UserService, DataStoreService],        
})
export class UserModule {}
