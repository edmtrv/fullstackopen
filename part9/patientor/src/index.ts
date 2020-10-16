import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
