import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ProntuariosModule } from './prontuarios/prontuarios.module';

@Module({
  imports: [UsuariosModule, PacientesModule, ProntuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
