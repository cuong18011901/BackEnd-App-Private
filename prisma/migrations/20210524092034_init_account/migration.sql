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

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_category" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL DEFAULT E'Category',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_post" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT,
    "title" TEXT,
    "category_id" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "account_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account.email_unique" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account.phone_unique" ON "account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "account_category_account_id_unique" ON "account_category"("account_id");

-- AddForeignKey
ALTER TABLE "account_category" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_post" ADD FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_post" ADD FOREIGN KEY ("category_id") REFERENCES "account_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
