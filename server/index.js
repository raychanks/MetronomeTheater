const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log('server started');
});
