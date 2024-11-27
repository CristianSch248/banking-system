import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'john_doe' })
  readonly username: string;

  @ApiProperty({ description: 'Senha do usuário', example: '123456' })
  readonly password: string;

  @ApiProperty({
    description: 'Saldo inicial do usuário',
    example: 0,
    default: 0,
  })
  readonly balance: number;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário (opcional)', example: 'john_doe', required: false })
  readonly username?: string;

  @ApiProperty({ description: 'Senha do usuário (opcional)', example: '123456', required: false })
  readonly password?: string;

  @ApiProperty({
    description: 'Saldo do usuário (opcional)',
    example: 100,
    required: false,
  })
  readonly balance?: number;
}

export class LoginUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'john_doe', required: false })
  readonly username?: string;

  @ApiProperty({ description: 'Senha do usuário', example: '123456', required: false })
  readonly password?: string;
}
