/*
  Warnings:

  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `refreshToken` VARCHAR(191) NULL;