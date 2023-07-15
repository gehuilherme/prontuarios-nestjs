import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usuario1 = await prisma.usuario.create({
    data: {
      nome: 'Gustavo',
      sobrenome: 'Miranda',
      dataNascimento: '1999-10-08T00:00:00Z',
      email: 'admin1@email.com',
      senha: '12345678',
      role: 'ADMIN',
    },
  });

  const paciente1 = await prisma.paciente.create({
    data: {
      nome: 'Guilherme',
      sobrenome: 'Miranda',
      dataNascimento: '1999-10-08T00:00:00Z',
    },
  });

  const prontuario1 = await prisma.prontuarios.create({
    data: {
      pacienteId: 1,
      usuarioId: 1,
    },
  });

  const regAtend = await prisma.registrosAtendimento.create({
    data: {
      descricao: 'Paciente teve tal coisa',
      prontuariosId: 1,
    },
  });

  const regAtend1 = await prisma.registrosAtendimento.create({
    data: {
      descricao: 'Paciente teve outra coisa coisa',
      prontuariosId: 1,
    },
  });

  console.log({ usuario1 });
  console.log({ paciente1 });
  console.log({ prontuario1 });
  console.log({ regAtend });
  console.log({ regAtend1 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
