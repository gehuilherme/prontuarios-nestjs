import { Injectable } from '@nestjs/common';
import { Prisma, Prontuarios } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProntuariosService {
  constructor(private prisma: PrismaService) {}

  async prontuario(
    prontuariosWhereUniqueInput: Prisma.ProntuariosWhereUniqueInput,
  ): Promise<Prontuarios | null> {
    return this.prisma.prontuarios.findUnique({
      where: prontuariosWhereUniqueInput,
    });
  }

  async prontuarios(): Promise<Prontuarios[]> {
    return this.prisma.prontuarios.findMany();
  }
}
