const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || '9000';
app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(port, function() {
  console.log(`listen at ${port}`);
});
