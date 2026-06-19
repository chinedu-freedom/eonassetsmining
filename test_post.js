const axios = require('axios');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE0NzlkMDNkLWU4ODItNGFlMy04YmViLWE5NGM3Zjc3YjQxMSIsImVtYWlsIjoiYWRtaW5AZW9uYXNzZXRzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MTcxMDg0MSwiZXhwIjoxNzgxNzk3MjQxfQ.aNYC8OjVqlX7jqgIUsis-6F-sWVe5kg8KK8MYou00Ws";

axios.post('http://localhost:3001/api/admin/plans', {
  name: "Test",
  description: "Test",
  duration: 1,
  daily_income: 1,
  min_investment: 1,
  max_investment: 2,
  capital_return: true,
  is_fixed_deposit: false,
  status: true,
  image: null
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).then(res => console.log(res.data)).catch(err => {
  console.log("Status:", err.response.status);
  console.log("Data:", err.response.data);
});
