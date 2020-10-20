import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';

import { NonSensitivePatientInfo, Patient, NewPatient } from '../types';

const getPatientInfo = (): Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatientInfo, addPatient };
