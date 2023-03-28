/*
  Warnings:

  - You are about to drop the column `inConfirmed` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `inConfirmed`,
    ADD COLUMN `isConfirmed` BOOLEAN NOT NULL DEFAULT false;
