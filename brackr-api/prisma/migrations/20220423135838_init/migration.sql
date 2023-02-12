-- AlterTable
ALTER TABLE "trackedObject" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "trackedObject" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
