const express = require('express');
const app = express();

console.log(
  'Hola Rolling desde Node con Express, ahora con nodemon'
);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
