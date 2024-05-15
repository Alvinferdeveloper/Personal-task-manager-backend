/*
  Warnings:

  - Added the required column `new` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `token` ADD COLUMN `new` INTEGER NOT NULL;
