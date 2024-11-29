import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CreateDepositDto, UpdateDepositDto } from './deposits.dto';
import { Deposit, User } from './deposits.types';

@Injectable()
export class DepositsService {
  private readonly baseUrlUsers = 'http://localhost:3001/usuarios';
  private readonly baseUrlPendingDeposits = 'http://localhost:3001/depositosPendentes';

  async getDeposits() {
    try {
      const response = await axios.get<Deposit[]>(this.baseUrlPendingDeposits);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar depósitos pendentes');
    }
  }

  async createDeposit(createDepositDto: CreateDepositDto) {
    try {
      const response = await axios.post<Deposit>(this.baseUrlPendingDeposits, createDepositDto);
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar depósito');
    }
  }

  async approveDeposit(updateDepositDto: UpdateDepositDto) {
    const { id, userId } = updateDepositDto;

    try {
      // Obter depósitos pendentes
      const pendingDepositsResponse = await axios.get<Deposit[]>(this.baseUrlPendingDeposits);
      const depositosPendentes = pendingDepositsResponse.data;

      // Encontrar o depósito
      const deposit = depositosPendentes.find((d) => d.id === id);
      if (!deposit) {
        throw new NotFoundException('Depósito pendente não encontrado');
      }

      // Atualizar status para "Aprovado"
      deposit.status = 'Aprovado';

      // Atualizar lista de depósitos pendentes
      const updatedPendingDeposits = depositosPendentes.filter((d) => d.id !== id);
      await axios.put(`${this.baseUrlPendingDeposits}`, updatedPendingDeposits);

      // Buscar usuário
      const userResponse = await axios.get<User>(`${this.baseUrlUsers}/${userId}`);
      if (!userResponse.data) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const user = userResponse.data;

      // Atualizar depósitos do usuário
      const updatedUser = {
        ...user,
        depositos: [...user.depositos, deposit],
      };

      await axios.put(`${this.baseUrlUsers}/${userId}`, updatedUser);

      return { message: 'Depósito aprovado e adicionado ao usuário', deposit };
    } catch (error) {
      console.error("Erro ao aprovar depósito:", error);
      throw new Error('Erro ao aprovar depósito');
    }
  }

  async rejectDeposit(updateDepositDto: UpdateDepositDto) {
    const { id, userId } = updateDepositDto;

    try {
      // Obter depósitos pendentes
      const pendingDepositsResponse = await axios.get<Deposit[]>(this.baseUrlPendingDeposits);
      const depositosPendentes = pendingDepositsResponse.data;

      // Encontrar o depósito
      const deposit = depositosPendentes.find((d) => d.id === id);
      if (!deposit) {
        throw new NotFoundException('Depósito pendente não encontrado');
      }

      // Atualizar status para "Rejeitado"
      deposit.status = 'Rejeitado';

      // Atualizar lista de depósitos pendentes
      const updatedPendingDeposits = depositosPendentes.filter((d) => d.id !== id);
      await axios.put(`${this.baseUrlPendingDeposits}`, updatedPendingDeposits);

      // Buscar usuário
      const userResponse = await axios.get<User>(`${this.baseUrlUsers}/${userId}`);
      if (!userResponse.data) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const user = userResponse.data;

      // Atualizar depósitos do usuário
      const updatedUser = {
        ...user,
        depositos: [...user.depositos, deposit],
      };

      await axios.put(`${this.baseUrlUsers}/${userId}`, updatedUser);

      return { message: 'Depósito rejeitado e adicionado ao usuário', deposit };
    } catch (error) {
      console.error("Erro ao rejeitar depósito:", error);
      throw new Error('Erro ao rejeitar depósito');
    }
  }

  async getPendingDeposits(): Promise<Deposit[]> {
    try {
      const response = await axios.get<Deposit[]>(this.baseUrlPendingDeposits);

      if (!response.data || response.data.length === 0) {
        throw new NotFoundException('Nenhum depósito pendente encontrado');
      }

      // Filtrar apenas depósitos pendentes
      const pendingDeposits = response.data.filter((deposit) => deposit.status === 'Pendente');

      return pendingDeposits;
    } catch (error) {
      console.error('Erro ao buscar depósitos pendentes:', error);
      throw new Error('Erro ao buscar depósitos pendentes');
    }
  }
}
