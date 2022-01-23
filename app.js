// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');
const app = express();

// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const path = require('path');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('Server running on port: ', port);
});
