const { execSync } = require('child_process');
const path = require('path');

try {
  console.log("Running seed script in the backend...");
  execSync('node seed_deposits.js', { 
    cwd: path.resolve(__dirname, '../eonassetsmining-backend'),
    stdio: 'inherit'
  });
  console.log("Seed script completed successfully.");
} catch(e) {
  console.error("Error running seed script:", e.message);
}
