const jwt = require('jsonwebtoken');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0NzlkMDNkLWU4ODItNGFlMy04YmViLWE5NGM3Zjc3YjQxMSIsImVtYWlsIjoiYWRtaW5AZW9uYXNzZXRzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MTcxMDg0MSwiZXhwIjoxNzgxNzk3MjQxfQ.aNYC8OjVqlX7jqgIUsis-6F-sWVe5kg8KK8MYou00Ws";

try {
  const decoded = jwt.verify(token, 'supersecret');
  console.log("Decoded:", decoded);
} catch (e) {
  console.log("Error:", e.message);
}
