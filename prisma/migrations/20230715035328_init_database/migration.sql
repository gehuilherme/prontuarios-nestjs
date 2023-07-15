-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ENFERMEIRO', 'MEDICO', 'ADMIN');

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimaAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ENFERMEIRO',
    "dataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimaAtualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrosAtendimento" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataAtendimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacaoAtendimento" TIMESTAMP(3) NOT NULL,
    "prontuariosId" INTEGER,

    CONSTRAINT "RegistrosAtendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prontuarios" (
    "id" SERIAL NOT NULL,
    "dataRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacaoAtendimento" TIMESTAMP(3) NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Prontuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_id_key" ON "Paciente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrosAtendimento_id_key" ON "RegistrosAtendimento"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Prontuarios_id_key" ON "Prontuarios"("id");

-- AddForeignKey
ALTER TABLE "RegistrosAtendimento" ADD CONSTRAINT "RegistrosAtendimento_prontuariosId_fkey" FOREIGN KEY ("prontuariosId") REFERENCES "Prontuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuarios" ADD CONSTRAINT "Prontuarios_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prontuarios" ADD CONSTRAINT "Prontuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
