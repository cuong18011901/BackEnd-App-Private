-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT,
    "full_name" TEXT,
    "email" TEXT,
    "passcode" TEXT,
    "tell" TEXT,
    "address" TEXT,
    "phone" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "delete_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'Category',
    "code" TEXT NOT NULL,
    "account_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "delete_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_bill" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT,
    "item_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "delete_at" TIMESTAMP(3),
    "account_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill_item" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "account_bill_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_accountToaccount_category" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "account.email_unique" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account.phone_unique" ON "account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "account_category.code_unique" ON "account_category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_accountToaccount_category_AB_unique" ON "_accountToaccount_category"("A", "B");

-- CreateIndex
CREATE INDEX "_accountToaccount_category_B_index" ON "_accountToaccount_category"("B");

-- AddForeignKey
ALTER TABLE "account_category" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_bill" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_bill" ADD FOREIGN KEY ("category_id") REFERENCES "account_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_item" ADD FOREIGN KEY ("account_bill_id") REFERENCES "account_bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_accountToaccount_category" ADD FOREIGN KEY ("A") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_accountToaccount_category" ADD FOREIGN KEY ("B") REFERENCES "account_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
