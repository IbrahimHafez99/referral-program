-- AlterTable
ALTER TABLE `user` ADD COLUMN `inConfirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPhoneVerified` BOOLEAN NOT NULL DEFAULT false;
