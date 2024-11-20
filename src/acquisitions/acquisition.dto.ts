import { ApiProperty } from '@nestjs/swagger';

export class CreateAcquisitionDto {
  @ApiProperty({ description: 'Descrião da compra', example: 'Ração de cachorro' })
  readonly descricao: string;

  @ApiProperty({ description: 'Valor da compra', example: '15.00' })
  readonly valor: string;
}

export class UpdateAcquisitionDto {
  @ApiProperty({ description: 'Descrião da compra (opcional)', example: 'Ração de cachorro', required: false })
  readonly descricao?: string;

  @ApiProperty({ description: 'Valor da compra (opcional)', example: '15.00', required: false })
  readonly valor?: string;
}
