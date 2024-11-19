import express from 'express';
import * as core from "express-serve-static-core";
import { InitialWebSocketServic } from './websocket-server';



const app:core.Express = express();
const port = 3005;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
InitialWebSocketServic(httpServer);