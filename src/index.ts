import express from 'express';
import { json, urlencoded } from 'body-parser';
import pingRouter from './routes/ping';
import submitRouter from './routes/submit';
import readRouter from './routes/read';

const app = express();
const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/ping', pingRouter);
app.use('/submit', submitRouter);
app.use('/read', readRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
