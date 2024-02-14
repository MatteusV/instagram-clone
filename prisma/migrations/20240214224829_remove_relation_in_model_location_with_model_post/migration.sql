/*
  Warnings:

  - You are about to drop the column `postId` on the `locations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_postId_fkey";

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "postId";
