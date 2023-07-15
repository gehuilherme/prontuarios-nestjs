import { Controller, Get, Param } from '@nestjs/common';
import { ProntuariosService } from './prontuarios.service';
import { Prontuarios as ProntuariosModel } from '@prisma/client';

@Controller('prontuarios')
export class ProntuariosController {
  constructor(private readonly prontuariosService: ProntuariosService) {}

  @Get()
  async getUsers(): Promise<ProntuariosModel[]> {
    return this.prontuariosService.prontuarios();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ProntuariosModel> {
    return this.prontuariosService.prontuario({ id: Number(id) });
  }
}
