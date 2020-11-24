import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';

import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';

const getPatientsInfo = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): PublicPatient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error(`No patient with id ${patientId}`);
  }

  patient.entries.push(newEntry);

  return newEntry;
};

export default { getPatientsInfo, addPatient, getPatient, addEntry };
