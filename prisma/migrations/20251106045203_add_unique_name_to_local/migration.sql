/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Local` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Parameter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Local_name_key` ON `Local`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Parameter_code_key` ON `Parameter`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `Parameter_name_key` ON `Parameter`(`name`);
