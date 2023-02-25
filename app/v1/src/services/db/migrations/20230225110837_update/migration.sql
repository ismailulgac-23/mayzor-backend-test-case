-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserCart" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "userUuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL,
    CONSTRAINT "UserCart_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserCart_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductComment" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL,
    CONSTRAINT "ProductComment_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductComment_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductFavorite" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "userUuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL,
    CONSTRAINT "ProductFavorite_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductFavorite_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "userUuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "Order_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
