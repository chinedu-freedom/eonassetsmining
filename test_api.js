const axios = require('axios');
axios.get('http://localhost:3001/api/admin/plans').then(res => console.log(res.data)).catch(err => console.log(err.message));
