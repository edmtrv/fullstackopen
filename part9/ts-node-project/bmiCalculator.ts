interface BMIValues {
  height: number;
  weight: number;
}

export const parseBMIArguments = (
  height: string,
  weight: string
): BMIValues => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight),
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 15) {
    return 'Very severely underweight	';
  } else if (bmi >= 15 && bmi < 16) {
    return 'Severely underweight';
  } else if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else if (bmi >= 40) {
    return 'Obese Class III (Very severely obese)';
  } else {
    throw new Error('Illegal values');
  }
};
