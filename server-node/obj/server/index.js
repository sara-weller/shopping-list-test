const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Orders API
app.use('/orders', ordersRouter);

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});