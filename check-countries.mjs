import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../eonassetsmining-backend/.env') });

const prisma = new PrismaClient();

async function check() {
  const countries = await prisma.countries.findMany();
  console.log(countries);
}

check().finally(() => prisma.$disconnect());
