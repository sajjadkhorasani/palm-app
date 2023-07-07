/*
  Warnings:

  - You are about to drop the column `basketId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_basketId_fkey";

-- DropIndex
DROP INDEX "Product_authorId_basketId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "basketId";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,
    "basketId" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Purchase_productId_basketId_idx" ON "Purchase"("productId", "basketId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_productId_basketId_key" ON "Purchase"("productId", "basketId");

-- CreateIndex
CREATE INDEX "Product_authorId_idx" ON "Product"("authorId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
