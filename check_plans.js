const { PrismaClient } = require('../eonassetsmining-backend/node_modules/@prisma/client');
const prisma = new PrismaClient();
prisma.plans.findMany().then(plans => {
  console.log(JSON.stringify(plans, null, 2));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
