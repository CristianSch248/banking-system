import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly baseUrl = 'http://localhost:3001/usuarios';

  private readonly adminCredentials = {
    user: 'admin',
    senha: '123456',
  };

  async getUsers() {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  async getUser(id: string) {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    if (!response.data) throw new NotFoundException('User not found');
    return response.data;
  }

  async createUser(createUserDto: CreateUserDto) {

    const userWithDepositos = {
      ...createUserDto,
      depositos: [],
    };
  
    const response = await axios.post(this.baseUrl, userWithDepositos);
    return response.data;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const response = await axios.put(`${this.baseUrl}/${id}`, updateUserDto);
    if (!response.data) throw new NotFoundException('User not found');
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    if (!response.data) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  async authenticateAdmin(username: string, password: string) {
    if (
      username === this.adminCredentials.user &&
      password === this.adminCredentials.senha
    ) {
      return { message: 'Login bem-sucedido' }
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }
}
