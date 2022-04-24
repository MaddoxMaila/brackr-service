-- AlterTable
ALTER TABLE "position" ADD COLUMN     "journeyId" INTEGER;

-- AddForeignKey
ALTER TABLE "position" ADD FOREIGN KEY ("journeyId") REFERENCES "journey"("id") ON DELETE SET NULL ON UPDATE CASCADE;
