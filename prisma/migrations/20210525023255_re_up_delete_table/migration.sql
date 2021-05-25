-- AlterTable
ALTER TABLE "account" ADD COLUMN     "delete_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "account_category" ADD COLUMN     "delete_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "account_post" ADD COLUMN     "delete_at" TIMESTAMP(3);
