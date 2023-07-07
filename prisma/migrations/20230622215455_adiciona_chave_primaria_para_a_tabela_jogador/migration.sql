/*
  Warnings:

  - Added the required column `id` to the `jogador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jogador` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
