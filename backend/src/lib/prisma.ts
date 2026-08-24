import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "shutki_ecommerce",
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;