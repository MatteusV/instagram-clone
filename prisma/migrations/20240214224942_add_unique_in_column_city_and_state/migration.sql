/*
  Warnings:

  - A unique constraint covering the columns `[city]` on the table `locations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[state]` on the table `locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "locations_city_key" ON "locations"("city");

-- CreateIndex
CREATE UNIQUE INDEX "locations_state_key" ON "locations"("state");
