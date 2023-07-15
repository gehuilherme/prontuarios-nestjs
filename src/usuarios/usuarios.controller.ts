import { Controller, Get, Param, Query } from '@nestjs/common';
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
  async getUserById(@Param('id') id: string): Promise<UsuariosModel> {
    return this.usuariosService.usuario({ id: Number(id) });
  }
}
