import { Injectable } from '@nestjs/common';

@Injectable()
export class DataStoreService {
  private usuarios = [
    {
      id: 'b0ab',
      username: 'cristian',
      password: '123456',
      balance: 1405,
      depositos: [
        { id: '4803', valor: 55, status: 'Aprovado', userId: 'b0ab' },
        { id: '4804', valor: 100, status: 'Aprovado', userId: 'b0ab' },
      ],
      compras: [
        { descricao: 'ração', valor: 15, date: '2024-11-29T17:46:19.871Z' },
      ],
    },
    {
      id: '484b',
      username: 'criis',
      password: '1234',
      balance: 0,
      depositos: [],
      compras: [],
    },
  ];

  private depositosPendentes = [];

  // Métodos para acessar e manipular os dados
  getUsuarios() {
    return this.usuarios;
  }

  getUsuarioById(id: string) {
    return this.usuarios.find(user => user.id === id);
  }

  addUsuario(usuario: any) {
    this.usuarios.push(usuario);
  }

  updateUsuario(id: string, updateData: any) {
    const index = this.usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarios[index], ...updateData };
      return this.usuarios[index];
    }
    return null;
  }

  removeUsuario(id: string) {
    const index = this.usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
      return this.usuarios.splice(index, 1);
    }
    return null;
  }

  getDepositosPendentes() {
    return this.depositosPendentes;
  }

  addDepositoPendente(deposito: any) {
    this.depositosPendentes.push(deposito);
  }

  removeDepositoPendente(id: string) {
    const index = this.depositosPendentes.findIndex(dep => dep.id === id);
    if (index !== -1) {
      return this.depositosPendentes.splice(index, 1);
    }
    return null;
  }
}
