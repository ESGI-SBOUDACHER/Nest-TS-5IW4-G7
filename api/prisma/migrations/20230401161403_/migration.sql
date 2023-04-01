-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_articleId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
