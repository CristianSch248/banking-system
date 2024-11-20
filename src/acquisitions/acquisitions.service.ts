import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { CreateAcquisitionDto } from './acquisition.dto';

interface User {
  id: string;
  username: string;
  password: string;
  balance: number;
  depositos: any[];
  compras: { descricao: string; valor: number; date: string }[];
}

@Injectable()
export class AcquisitionsService {
  private readonly baseUrl = 'http://localhost:3001/usuarios';

  async createAcquisition(userId: string, createAcquisitionDto: CreateAcquisitionDto) {
    const { descricao, valor } = createAcquisitionDto;

    // Validações iniciais
    const valorNumber = parseFloat(valor);
    if (isNaN(valorNumber) || valorNumber <= 0) {
      throw new BadRequestException('Valor inválido.');
    }

    // Busca o usuário no servidor JSON
    const userResponse = await axios.get<User>(`${this.baseUrl}/${userId}`);
    const user = userResponse.data;
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Verifica saldo
    if (user.balance < valorNumber) {
      throw new BadRequestException('Saldo insuficiente.');
    }

    // Atualiza saldo e adiciona a compra
    user.balance -= valorNumber;
    const newPurchase = { descricao, valor: valorNumber, date: new Date().toISOString() };
    user.compras.push(newPurchase);

    // Salva as mudanças no servidor JSON
    await axios.put(`${this.baseUrl}/${userId}`, user);

    return {
      message: 'Compra realizada com sucesso!',
      compras: user.compras,
    };
  }

  async getAcquisitions(userId: string) {
    // Busca o usuário no servidor JSON
    const userResponse = await axios.get<User>(`${this.baseUrl}/${userId}`);
    const user = userResponse.data;

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Retorna as compras do usuário
    return user.compras;
  }
}
