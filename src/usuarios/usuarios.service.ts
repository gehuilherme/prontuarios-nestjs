import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from '../prisma.service';


@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async usuario(
    userWhereUniqueInput: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async usuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }
}
