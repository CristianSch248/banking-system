import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CreateDepositDto, UpdateDepositDto } from './deposits.dto';
import { Deposit, User } from './deposits.types';

@Injectable()
export class DepositsService {
  private readonly baseUrl = 'http://localhost:3001/depositos';
  private readonly baseUrlUsers = 'http://localhost:3001/usuarios';
  private readonly baseUrlPendingDeposits = 'http://localhost:3001/depositosPendentes';

  async getDeposits() {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  async createDeposit(createDepositDto: CreateDepositDto): Promise<Deposit> {
    const response = await axios.post<Deposit>(this.baseUrl, createDepositDto);
    return response.data;
}


  async approveDeposit(updateDepositDto: UpdateDepositDto) {
    const { userId } = updateDepositDto;

    // Atualizar o status do depósito para "Aprovado"
    const depositResponse = await axios.put<Deposit>(`${this.baseUrl}/${userId}`, {
      ...updateDepositDto,
      status: 'Aprovado',
    });

    const deposit = depositResponse.data;

    // Buscar o usuário pelo ID relacionado ao depósito
    const userResponse = await axios.get<User>(`${this.baseUrlUsers}/${userId}`);
    if (!userResponse.data) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const user = userResponse.data;

    // Atualizar a lista de depósitos do usuário
    const updatedUser = {
      ...user,
      depositos: [...user.depositos, deposit],
    };

    await axios.put(`${this.baseUrlUsers}/${userId}`, updatedUser);

    return { message: 'Depósito aprovado e adicionado ao usuário', deposit };
  }

  async rejectDeposit(updateDepositDto: UpdateDepositDto) {
    const { userId } = updateDepositDto;

    const depositResponse = await axios.put<Deposit>(`${this.baseUrl}/${userId}`, {
      ...updateDepositDto,
      status: 'Rejeitado',
    });

    const deposit = depositResponse.data;

    const userResponse = await axios.get<User>(`${this.baseUrlUsers}/${userId}`);
    if (!userResponse.data) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const user = userResponse.data;

    const updatedUser = {
      ...user,
      depositos: [...user.depositos, deposit],
    };

    await axios.put(`${this.baseUrlUsers}/${userId}`, updatedUser);

    return { message: 'Depósito rejeitado e adicionado ao usuário', deposit };
  }

  async getPendingDeposits(): Promise<Deposit[]> {
    const response = await axios.get<Array<{ idUser: string; valor: number; status: string }>>(
      this.baseUrlPendingDeposits
    );

    if (!response.data) {
      throw new NotFoundException('Nenhum depósito pendente encontrado');
    }

    // Mapeando os dados recebidos para o formato esperado pelo tipo Deposit
    const pendingDeposits: Deposit[] = response.data
      .filter(deposit => deposit.status === 'Pendente')
      .map(deposit => ({
        id: '', // Adicione aqui como o ID deve ser preenchido
        userId: deposit.idUser,
        valor: deposit.valor,
        status: deposit.status,
      }));

    return pendingDeposits;
  }
}
