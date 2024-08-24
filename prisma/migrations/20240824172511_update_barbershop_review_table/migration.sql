/*
  Warnings:

  - A unique constraint covering the columns `[userId,barbershopId]` on the table `BarbershopReview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BarbershopReview_userId_barbershopId_key" ON "BarbershopReview"("userId", "barbershopId");
