-- CreateEnum
CREATE TYPE "GENDERS" AS ENUM ('FEMININE', 'MASCULINE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "GENDERS";
