-- DropIndex
DROP INDEX "account_category_account_id_unique";

-- CreateTable
CREATE TABLE "_accountToaccount_category" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_accountToaccount_category_AB_unique" ON "_accountToaccount_category"("A", "B");

-- CreateIndex
CREATE INDEX "_accountToaccount_category_B_index" ON "_accountToaccount_category"("B");

-- AddForeignKey
ALTER TABLE "_accountToaccount_category" ADD FOREIGN KEY ("A") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_accountToaccount_category" ADD FOREIGN KEY ("B") REFERENCES "account_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
