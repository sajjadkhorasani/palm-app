/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
