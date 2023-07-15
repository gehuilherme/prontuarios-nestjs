import { Controller, Get, Param } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { Paciente as PacientesModel } from '@prisma/client';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get()
  async getUsers(): Promise<PacientesModel[]> {
    return this.pacientesService.pacientes();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<PacientesModel> {
    return this.pacientesService.paciente({ id: Number(id) });
  }
}
