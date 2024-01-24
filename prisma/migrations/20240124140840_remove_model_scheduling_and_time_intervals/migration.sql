/*
  Warnings:

  - You are about to drop the `schedulings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_time_intervals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "schedulings";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "user_time_intervals";
PRAGMA foreign_keys=on;
