const { execSync } = require('child_process');
const path = require('path');

try {
  execSync('node count_deposits.js', { 
    cwd: path.resolve(__dirname, '../eonassetsmining-backend'),
    stdio: 'inherit'
  });
} catch(e) {
  console.error("Error running script:", e.message);
}
