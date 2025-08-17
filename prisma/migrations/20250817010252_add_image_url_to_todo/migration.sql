-- AlterTable
ALTER TABLE "Todo" ADD COLUMN "imageURL" TEXT;

-- CreateIndex
CREATE INDEX "Todo_dueDate_createdAt_idx" ON "Todo"("dueDate", "createdAt");
