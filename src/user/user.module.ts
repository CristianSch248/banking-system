import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController], // Registra o controlador
  providers: [UserService],      // Registra o serviço
  exports: [UserService],        // Exporta o serviço para ser usado em outros módulos (se necessário)
})
export class UserModule {}
