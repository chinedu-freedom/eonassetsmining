const fetch = require('node-fetch'); // If next.js 13+ we can just use global fetch in Node 18+

async function clearData() {
  console.log("Fetching payment methods...");
  const res = await fetch('http://localhost:3001/admin/settings/payment-methods');
  const data = await res.json();
  
  if (!Array.isArray(data)) {
    console.error("Failed to fetch:", data);
    return;
  }
  
  console.log(`Found ${data.length} payment methods to delete.`);
  
  for (const item of data) {
    console.log(`Deleting ${item.id}...`);
    await fetch(`http://localhost:3001/admin/settings/payment-methods/${item.id}`, {
      method: 'DELETE'
    });
  }
  
  console.log("Finished deleting payment methods.");
}

clearData();
