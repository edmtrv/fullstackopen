import express from 'express';
import { calculateBmi, parseBMIArguments } from './bmiCalculator';
import {
  calculateExercises,
  parseExerciseArguments,
} from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseBMIArguments(
      req.query.height as string,
      req.query.weight as string
    );
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch (e) {
    res.json({ error: 'malformed parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: any = req.body;

  try {
    const { target, dailyHours } = parseExerciseArguments(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.target,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data.daily_exercises
    );

    const exerciseData = calculateExercises(target, dailyHours);
    res.json(exerciseData);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

    res.json({ error: e.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
