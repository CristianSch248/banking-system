import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositDto {
  @ApiProperty({ description: 'Valor do depósito', example: 1250.25 })
  readonly valor: number;

  @ApiProperty({ description: 'Deposito pendente', example: 'Pendente' })
  readonly status: string;

  @ApiProperty({ description: 'ID do usuário relacionado ao depósito', example: 'b0ab' })
  readonly userId: string;
}

export class UpdateDepositDto {
  @ApiProperty({ description: 'Valor do depósito (opcional)', example: 1250.25 })
  readonly valor: number;

  @ApiProperty({ description: 'Deposito pendente (opcional)', example: 'Pendente' })
  readonly status: string;

  @ApiProperty({ description: 'ID do usuário relacionado ao depósito', example: 'b0ab' })
  readonly userId: string;
}
