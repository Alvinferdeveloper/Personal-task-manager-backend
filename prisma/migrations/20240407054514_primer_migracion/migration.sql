/*
  Warnings:

  - Added the required column `img_url` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `img_url` VARCHAR(191) NOT NULL;
