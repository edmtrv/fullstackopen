/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from '../types';

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }

  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of birth ${date}`);
  }

  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error(`Incorrect or missing ssn ${ssn}`);
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation ${occupation}`);
  }

  return occupation;
};

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  return ssn.includes('-') && (ssn.length === 10 || ssn.length === 11);
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatient;
