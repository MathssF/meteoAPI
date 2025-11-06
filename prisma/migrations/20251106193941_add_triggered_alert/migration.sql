-- AlterTable
ALTER TABLE `Alert` ADD COLUMN `message` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Local` ADD COLUMN `check` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Parameter` ADD COLUMN `check` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `TriggeredAlert` (
    `id` VARCHAR(191) NOT NULL,
    `alertId` VARCHAR(191) NOT NULL,
    `localId` VARCHAR(191) NOT NULL,
    `parameterId` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `alertDate` DATETIME(3) NOT NULL,
    `alertTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TriggeredAlert` ADD CONSTRAINT `TriggeredAlert_alertId_fkey` FOREIGN KEY (`alertId`) REFERENCES `Alert`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TriggeredAlert` ADD CONSTRAINT `TriggeredAlert_localId_fkey` FOREIGN KEY (`localId`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TriggeredAlert` ADD CONSTRAINT `TriggeredAlert_parameterId_fkey` FOREIGN KEY (`parameterId`) REFERENCES `Parameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
