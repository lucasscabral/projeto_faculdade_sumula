-- CreateTable
CREATE TABLE `time` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jogador` (
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `posicao` ENUM('GL', 'ZG', 'LD', 'LE', 'VL', 'ME', 'AT') NOT NULL,
    `timeId` INTEGER NOT NULL,

    UNIQUE INDEX `jogador_cpf_key`(`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jogador` ADD CONSTRAINT `jogador_timeId_fkey` FOREIGN KEY (`timeId`) REFERENCES `time`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
