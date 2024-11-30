import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

// Agrupa as rotas no Swagger
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Obter todos os usuários' })
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: UpdateUserDto })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Deletar um usuário pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Autenticar usuario' })
  @Post('/auth/user')
  async authenticateUser(
    @Body() LoginUserDto: LoginUserDto,
  ) {
    return this.userService.authenticateUser(LoginUserDto);
  }

  @ApiOperation({ summary: 'Autenticar administrador' })
  @Post('/auth/admin')
  async authenticateAdmin( @Body() credentials: { username: string; password: string } ) {
    return this.userService.authenticateAdmin(
      credentials.username,
      credentials.password,
    );
  }
}
