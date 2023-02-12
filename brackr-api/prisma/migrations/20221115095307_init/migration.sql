-- AlterTable
ALTER TABLE "journey" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "journey" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
