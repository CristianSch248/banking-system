import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';


interface Usuario {
  id: string;
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  private readonly baseUrl = 'http://localhost:3001/usuarios';

  private readonly adminCredentials = {
    username: 'admin',
    password: '123456',
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
      compras: []
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

  async authenticateUser(loginUserDto: LoginUserDto) {
    try {
      const response = await axios.get<Usuario[]>(this.baseUrl); // Tipando o retorno como array de usuários
      const usuarios = response.data;

      const usuario = usuarios.find(
        (user) => user.username == loginUserDto.username && user.password == loginUserDto.password,
      )

      if (usuario) {
        return usuario.id; 
      }
  
      throw new UnauthorizedException('Credenciais inválidas');
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error('Erro ao autenticar usuário:', error.message);
      throw new Error('Erro ao autenticar usuário.');
    }
  }

  async authenticateAdmin(username: string, password: string) {
    if (
      username === this.adminCredentials.username &&
      password === this.adminCredentials.password
    ) {
      return {
        statusCode: 200,
        message: 'Login bem-sucedido',
      };
    }
    throw new UnauthorizedException({
      statusCode: 401,
      message: 'Credenciais inválidas',
    });
  }  
}
