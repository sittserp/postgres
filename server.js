require('dotenv').config();
require('./lib/pool').connect();
const app = require('./lib/app');
const port = 5432; app.listen(port, () => { console.log(`Listening at http://localhost:${port}`); })