interface ExerciseValues {
  target: number;
  dailyHours: Array<number>;
}

interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).every((a) => !isNaN(Number(a)))) {
    return {
      target: Number(args[2]),
      dailyHours: args.slice(3).map((a) => Number(a)),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): ExerciseStats => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating, ratingDescription;

  if (target - average > 0.5) {
    rating = 1;
    ratingDescription = 'very bad';
  } else if (target - average <= 0.5 && target - average > 0) {
    rating = 2;
    ratingDescription = 'not too bad, could be better';
  } else {
    rating = 3;
    ratingDescription = 'very good';
  }

  return {
    periodLength,
    trainingDays,
    success,
    target,
    rating,
    ratingDescription,
    average,
  };
};

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log('There was an error:', e.message);
}
