import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAcquisitionDto } from './acquisition.dto';
import { AcquisitionsService } from './acquisitions.service';

@ApiTags('Acquisitions')
@Controller('acquisitions')
export class AcquisitionsController {
  constructor(private readonly acquisitionsService: AcquisitionsService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Cria uma nova compra para o usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 'b0ab' })
  @ApiBody({
    description: 'Dados para criar uma compra',
    type: CreateAcquisitionDto,
  })
  @ApiResponse({ status: 201, description: 'Compra realizada com sucesso!' })
  @ApiResponse({ status: 400, description: 'Erro de validação ou saldo insuficiente.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async createAcquisition(@Param('id') id: string, @Body() createAcquisitionDto: CreateAcquisitionDto) {
    const result = await this.acquisitionsService.createAcquisition(id, createAcquisitionDto);
    return { message: 'Compra realizada com sucesso!', compras: result.compras };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém todas as compras de um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: 'b0ab' })
  @ApiResponse({ status: 200, description: 'Lista de compras do usuário.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  async getAcquisitions(@Param('id') id: string) {
    const compras = await this.acquisitionsService.getAcquisitions(id);
    if (!compras) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    return { compras };
  }
}
