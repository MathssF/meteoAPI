/*
  Warnings:

  - You are about to drop the column `alertDate` on the `TriggeredAlert` table. All the data in the column will be lost.
  - You are about to drop the column `alertTime` on the `TriggeredAlert` table. All the data in the column will be lost.
  - You are about to drop the column `localId` on the `TriggeredAlert` table. All the data in the column will be lost.
  - You are about to drop the column `parameterId` on the `TriggeredAlert` table. All the data in the column will be lost.
  - Added the required column `measurementId` to the `TriggeredAlert` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TriggeredAlert` DROP FOREIGN KEY `TriggeredAlert_localId_fkey`;

-- DropForeignKey
ALTER TABLE `TriggeredAlert` DROP FOREIGN KEY `TriggeredAlert_parameterId_fkey`;

-- DropIndex
DROP INDEX `TriggeredAlert_localId_fkey` ON `TriggeredAlert`;

-- DropIndex
DROP INDEX `TriggeredAlert_parameterId_fkey` ON `TriggeredAlert`;

-- AlterTable
ALTER TABLE `TriggeredAlert` DROP COLUMN `alertDate`,
    DROP COLUMN `alertTime`,
    DROP COLUMN `localId`,
    DROP COLUMN `parameterId`,
    ADD COLUMN `measurementId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TriggeredAlert` ADD CONSTRAINT `TriggeredAlert_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `Measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
