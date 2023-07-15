import { Injectable } from '@nestjs/common';
import { Prisma, Paciente } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PacientesService {
  constructor(private prisma: PrismaService) {}

  async paciente(
    pacienteWhereUniqueInput: Prisma.PacienteWhereUniqueInput,
  ): Promise<Paciente | null> {
    return this.prisma.paciente.findUnique({
      where: pacienteWhereUniqueInput,
    });
  }

  async pacientes(): Promise<Paciente[]> {
    return this.prisma.paciente.findMany();
  }
}
