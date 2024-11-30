import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Geração de IDs únicos
import { DataStoreService } from '../datastore/datastore.service';
import { CreateDepositDto, UpdateDepositDto } from './deposits.dto';
import { Deposit } from './deposits.types';

@Injectable()
export class DepositsService {
  constructor(private readonly dataStoreService: DataStoreService) {}

  async getDeposits(): Promise<Deposit[]> {
    return this.dataStoreService.getDepositosPendentes();
  }

  async createDeposit(createDepositDto: CreateDepositDto): Promise<Deposit> {

    const newDeposit: Deposit = {
      ...createDepositDto,
      id: uuidv4(),
      status: 'Pendente', 
    };

    this.dataStoreService.addDepositoPendente(newDeposit);
    return newDeposit;
  }

  async approveDeposit(updateDepositDto: UpdateDepositDto): Promise<{ message: string; deposit: Deposit }> {
    const { id, userId } = updateDepositDto;

    const deposit = this.dataStoreService.getDepositosPendentes().find((d) => d.id === id);
    if (!deposit) throw new NotFoundException('Depósito pendente não encontrado');

    deposit.status = 'Aprovado';

    this.dataStoreService.removeDepositoPendente(id);

    const user = this.dataStoreService.getUsuarioById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    user.balance += deposit.valor;
    user.depositos.push(deposit);

    this.dataStoreService.updateUsuario(userId, user);

    return { message: 'Depósito aprovado e adicionado ao usuário', deposit };
  }

  async rejectDeposit(updateDepositDto: UpdateDepositDto): Promise<{ message: string; deposit: Deposit }> {
    const { id, userId } = updateDepositDto;

    const deposit = this.dataStoreService.getDepositosPendentes().find((d) => d.id === id);
    if (!deposit) throw new NotFoundException('Depósito pendente não encontrado');

    deposit.status = 'Rejeitado';

    this.dataStoreService.removeDepositoPendente(id);

    const user = this.dataStoreService.getUsuarioById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    user.depositos.push(deposit);

    this.dataStoreService.updateUsuario(userId, user);

    return { message: 'Depósito rejeitado e adicionado ao usuário', deposit };
  }

  async getPendingDeposits(): Promise<Deposit[]> {
    
    const pendingDeposits = this.dataStoreService.getDepositosPendentes().filter((deposit) => deposit.status === 'Pendente');
    if (!pendingDeposits || pendingDeposits.length === 0) throw new NotFoundException('Nenhum depósito pendente encontrado');
    
    return pendingDeposits;
  }
}
