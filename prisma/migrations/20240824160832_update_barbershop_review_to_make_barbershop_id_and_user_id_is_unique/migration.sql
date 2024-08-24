/*
  Warnings:

  - A unique constraint covering the columns `[barbershopId]` on the table `BarbershopReview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `BarbershopReview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BarbershopReview_barbershopId_key" ON "BarbershopReview"("barbershopId");

-- CreateIndex
CREATE UNIQUE INDEX "BarbershopReview_userId_key" ON "BarbershopReview"("userId");
