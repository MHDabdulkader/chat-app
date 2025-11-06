/*
  Warnings:

  - Added the required column `updateAt` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
