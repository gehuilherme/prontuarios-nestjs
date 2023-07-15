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

  async criarUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  async alteraUsuario(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: Prisma.UsuarioUpdateInput;
  }): Promise<Usuario> {
    const { data, where } = params;
    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  async deletaUsuario(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}
