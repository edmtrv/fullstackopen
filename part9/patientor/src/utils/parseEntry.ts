/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewEntry, HealthCheckRating, NewBaseEntry } from '../types';

const toNewEntry = (object: any): NewEntry => {
  const type = object.type;

  if (!type || !isType(type)) {
    throw new Error(`Invalid type ${type}`);
  }
  const entry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if (object.diagnosisCodes)
    entry.diagnosisCodes = parseDiagnosis(object.diagnosisCodes);

  switch (type) {
    case 'HealthCheck':
      return {
        ...entry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case 'OccupationalHealthcare':
      const obj: NewEntry = {
        ...entry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
      };
      if (object.sickLeave) obj.sickLeave = parseSickLeave(object.sickLeave);

      return obj;
    case 'Hospital':
      return {
        ...entry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    default:
      return assertNever(type);
  }
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description ${description}`);
  }

  return description;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }

  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist ${specialist}`);
  }

  return specialist;
};

const parseDiagnosis = (diagnosisCodes: any): string[] => {
  if (!isArray(diagnosisCodes)) {
    throw new Error(`Incorrect diagnosis code ${diagnosisCodes}`);
  }

  return diagnosisCodes;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating ${rating}`);
  }

  return rating;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing employer name ${name}`);
  }

  return name;
};

const parseSickLeave = (
  sickLeave: any
): { startDate: string; endDate: string } => {
  if (!isSickLeave(sickLeave)) {
    throw new Error(`Incorrect sick leave ${sickLeave}`);
  }

  return sickLeave;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge ${discharge}`);
  }

  return discharge;
};

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const isArray = (param: any): param is string[] => {
  return Array.isArray(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isSickLeave = (
  param: any
): param is { startDate: string; endDate: string } => {
  return (
    Object.keys(param).includes('startDate') &&
    Object.keys(param).includes('endDate')
  );
};

const isDischarge = (
  param: any
): param is { date: string; criteria: string } => {
  return (
    Object.keys(param).includes('date') &&
    Object.keys(param).includes('criteria')
  );
};

const isType = (
  param: any
): param is 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital' => {
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewEntry;
