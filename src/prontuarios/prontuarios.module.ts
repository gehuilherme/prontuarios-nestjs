import { Module } from '@nestjs/common';
import { ProntuariosService } from './prontuarios.service';
import { ProntuariosController } from './prontuarios.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProntuariosController],
  providers: [ProntuariosService, PrismaService],
})
export class ProntuariosModule {}
