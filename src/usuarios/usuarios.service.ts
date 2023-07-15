import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { createCipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

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
    // Gera a senha criptografada
    const iv = randomBytes(16);
    const chave = '36201923898983245156487166564765627420101234';
    const key = (await promisify(scrypt)(chave, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    const senhaDigitada = data.senha;
    const encryptedText = Buffer.concat([
      cipher.update(senhaDigitada),
      cipher.final(),
    ]);
    // Converte o Buffer em uma string hexadecimal
    const senhaCriptografada = encryptedText.toString('hex');
    // Atualize o tipo do objeto `data` para incluir a propriedade `senha`
    const dadosUsuario: Prisma.UsuarioCreateInput = {
      ...data,
      senha: senhaCriptografada,
    };

    return this.prisma.usuario.create({
      data: dadosUsuario,
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
