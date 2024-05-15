/*
  Warnings:

  - You are about to drop the column `userId` on the `token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_userId_fkey`;

-- AlterTable
ALTER TABLE `token` DROP COLUMN `userId`;
