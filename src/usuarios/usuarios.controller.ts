import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario as UsuariosModel } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async getUsers(): Promise<UsuariosModel[]> {
    return this.usuariosService.usuarios();
  }

  @Get(':id')
  async getUsuariosPorId(@Param('id') id: string): Promise<UsuariosModel> {
    return this.usuariosService.usuario({ id: Number(id) });
  }

  @Post()
  async criarUsuario(
    @Body() dadosUsuario: UsuariosModel,
  ): Promise<UsuariosModel> {
    return this.usuariosService.criarUsuario(dadosUsuario);
  }

  @Put(':id')
  async alteraUsuario(
    @Param('id') id: string,
    @Body() dadosUsuario: UsuariosModel,
  ): Promise<UsuariosModel> {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toISOString();
    return this.usuariosService.alteraUsuario({
      where: { id: Number(id) },
      data: {
        ...dadosUsuario,
        ultimaAtualizacao: dataFormatada,
      },
    });
  }

  @Delete(':id')
  async apagaUsuario(@Param('id') id: string): Promise<UsuariosModel> {
    return this.usuariosService.deletaUsuario({ id: Number(id) });
  }
}
