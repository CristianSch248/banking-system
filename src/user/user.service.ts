import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataStoreService } from '../datastore/datastore.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private readonly adminCredentials = {
    username: 'admin',
    password: '123456',
  };

  constructor(private readonly dataStoreService: DataStoreService) {}

  async getUsers() {
    return this.dataStoreService.getUsuarios();
  }

  async getUser(id: string) {
    const user = this.dataStoreService.getUsuarioById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: this.generateId(),
      depositos: [],
      compras: [],
    };

    this.dataStoreService.addUsuario(newUser);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.dataStoreService.updateUsuario(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  async deleteUser(id: string) {
    const deletedUser = this.dataStoreService.removeUsuario(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async authenticateUser(loginUserDto: LoginUserDto) {
    const usuarios = this.dataStoreService.getUsuarios();

    const usuario = usuarios.find(
      (user) =>
        user.username === loginUserDto.username &&
        user.password === loginUserDto.password,
    );

    if (usuario) {
      return usuario.id;
    }

    throw new UnauthorizedException('Credenciais inválidas');
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

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
