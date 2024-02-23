/*
  Warnings:

  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT;

-- DropTable
DROP TABLE "locations";
