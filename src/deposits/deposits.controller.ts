import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Put
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateDepositDto, UpdateDepositDto } from './deposits.dto';
import { DepositsService } from './deposits.service';
import { Deposit } from './deposits.types';

@ApiTags('Deposits')
@Controller('deposits')
export class DepositsController {
    constructor(private readonly depositsService: DepositsService) { }

    @ApiOperation({ summary: 'Criar um novo depósito' })
    @ApiBody({ type: CreateDepositDto })
    @Post()
    async createDeposit(@Body() createDepositDto: CreateDepositDto): Promise<Deposit> {
        try {
            return await this.depositsService.createDeposit(createDepositDto);
        } catch (error) {
            throw new HttpException('Erro ao criar depósito', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: 'Aprovar um depósito' })
    @ApiBody({ type: UpdateDepositDto })
    @Put('/approve')
    async approveDeposit(@Body() updateDepositDto: UpdateDepositDto) {
        try {
            return await this.depositsService.approveDeposit(updateDepositDto);
        } catch (error) {
            throw new HttpException(
                'Erro ao aprovar depósito',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiOperation({ summary: 'Rejeitar um depósito' })
    @ApiBody({ type: UpdateDepositDto })
    @Put('/reject')
    async rejectDeposit(@Body() updateDepositDto: UpdateDepositDto) {
        try {
            return await this.depositsService.rejectDeposit(updateDepositDto);
        } catch (error) {
            throw new HttpException(
                'Erro ao rejeitar depósito',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @ApiOperation({ summary: 'Obter todos os depósitos pendentes' })
    @Get('/pending')
    async getPendingDeposits(): Promise<Deposit[]> {
        try {
            return await this.depositsService.getPendingDeposits();
        } catch (error) {
            throw new HttpException('Erro ao buscar depósitos pendentes', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
