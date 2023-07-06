import express from 'express';
import path from 'path';

import cors from 'cors';
import morgan from 'morgan';
import { api } from './routes/api';

const __dirname = new URL('.', import.meta.url).pathname;

export const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(morgan('combined'));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.use('/v1', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
