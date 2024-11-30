import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataStoreService } from '../datastore/datastore.service';
import { CreateAcquisitionDto } from './acquisition.dto';

@Injectable()
export class AcquisitionsService {
  constructor(private readonly dataStoreService: DataStoreService) {}

  async createAcquisition(userId: string, createAcquisitionDto: CreateAcquisitionDto) {
    const { descricao, valor } = createAcquisitionDto;

    const valorNumber = parseFloat(valor);
    if (isNaN(valorNumber) || valorNumber <= 0) throw new BadRequestException('Valor inválido.');
    
    const user = this.dataStoreService.getUsuarioById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    if (user.balance < valorNumber) throw new BadRequestException('Saldo insuficiente.');
    
    user.balance -= valorNumber;

    const newPurchase = { descricao, valor: valorNumber, date: new Date().toISOString() };
    user.compras.push(newPurchase);

    this.dataStoreService.updateUsuario(userId, user);

    return {
      message: 'Compra realizada com sucesso!',
      compras: user.compras,
    };
  }

  async getAcquisitions(userId: string) {
    const user = this.dataStoreService.getUsuarioById(userId);
    if (!user) throw new NotFoundException('Usuário não encontrado.');
    
    return user.compras;
  }
}
