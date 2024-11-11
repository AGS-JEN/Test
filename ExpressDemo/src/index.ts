import express from 'express';
import * as core from "express-serve-static-core";



const app:core.Express = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
