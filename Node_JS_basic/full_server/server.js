const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use('/', routes);

const port = 1245;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export default app;
