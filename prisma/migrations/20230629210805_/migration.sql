-- DropForeignKey
ALTER TABLE `jogador` DROP FOREIGN KEY `jogador_timeId_fkey`;

-- AddForeignKey
ALTER TABLE `jogador` ADD CONSTRAINT `jogador_timeId_fkey` FOREIGN KEY (`timeId`) REFERENCES `time`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
