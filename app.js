// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
const app = express();

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');
// eslint-disable-next-line no-undef
const publicPath = path.join(__dirname, '..', 'public');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3001;

// eslint-disable-next-line no-undef
app.use(express.static('publicPath'));
app.get('*', (req, res) => {
  // eslint-disable-next-line no-undef
  req.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('Server running on port: ', port);
});
