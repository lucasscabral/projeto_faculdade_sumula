/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `time` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `time_nome_key` ON `time`(`nome`);
