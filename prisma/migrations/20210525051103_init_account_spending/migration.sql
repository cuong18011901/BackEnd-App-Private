-- CreateTable
CREATE TABLE "account_note" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT,
    "title" TEXT,
    "content" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "delete_at" TIMESTAMP(3),
    "category_id" INTEGER NOT NULL DEFAULT 0,
    "account_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_spending" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT,
    "title" TEXT,
    "description" TEXT,
    "totalAmount" DOUBLE PRECISION,
    "totalAmountSpent" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "delete_at" TIMESTAMP(3),
    "account_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_expense" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT,
    "description" TEXT,
    "amount" DOUBLE PRECISION,
    "input_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "delete_at" TIMESTAMP(3),
    "account_id" INTEGER NOT NULL,
    "spending_id" INTEGER NOT NULL,
    "accountSpendingId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "account_note" ADD FOREIGN KEY ("category_id") REFERENCES "account_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_note" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_spending" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_expense" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_expense" ADD FOREIGN KEY ("accountSpendingId") REFERENCES "account_spending"("id") ON DELETE SET NULL ON UPDATE CASCADE;
