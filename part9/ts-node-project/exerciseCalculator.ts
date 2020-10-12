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

export const parseExerciseArguments = (target: string, dailyHours: Array<string>): ExerciseValues => {
  if (!target || !dailyHours) throw new Error('Parameters missing');

  if (!isNaN(Number(target)) && dailyHours.every((d) => !isNaN(Number(d)))) {
    return {
      target: Number(target),
      dailyHours: dailyHours.map((a) => Number(a)),
    };
  } else {
    throw new Error('Malformatted parameters');
  }
};

export const calculateExercises = (
  target: number,
  dailyHours: Array<number>
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
