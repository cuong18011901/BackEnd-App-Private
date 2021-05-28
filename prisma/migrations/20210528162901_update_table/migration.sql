-- DropIndex
DROP INDEX "account_category.code_unique";

-- AlterTable
ALTER TABLE "account_category" ALTER COLUMN "code" DROP NOT NULL;
