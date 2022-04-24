-- Create DB

CREATE DATABASE todo;

-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "ordering" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
