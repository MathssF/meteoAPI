-- CreateTable
CREATE TABLE `Local` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lon` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parameter` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Measurement` (
    `id` VARCHAR(191) NOT NULL,
    `localId` VARCHAR(191) NOT NULL,
    `parameterId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,
    `batchId` VARCHAR(191) NULL,

    INDEX `Measurement_localId_timestamp_idx`(`localId`, `timestamp`),
    INDEX `Measurement_parameterId_timestamp_idx`(`parameterId`, `timestamp`),
    INDEX `Measurement_batchId_idx`(`batchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ForecastBatch` (
    `id` VARCHAR(191) NOT NULL,
    `runAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `source` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alert` (
    `id` VARCHAR(191) NOT NULL,
    `localId` VARCHAR(191) NOT NULL,
    `parameterId` VARCHAR(191) NOT NULL,
    `condition` VARCHAR(191) NOT NULL,
    `threshold` DOUBLE NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_localId_fkey` FOREIGN KEY (`localId`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_parameterId_fkey` FOREIGN KEY (`parameterId`) REFERENCES `Parameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Measurement` ADD CONSTRAINT `Measurement_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `ForecastBatch`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alert` ADD CONSTRAINT `Alert_localId_fkey` FOREIGN KEY (`localId`) REFERENCES `Local`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alert` ADD CONSTRAINT `Alert_parameterId_fkey` FOREIGN KEY (`parameterId`) REFERENCES `Parameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
