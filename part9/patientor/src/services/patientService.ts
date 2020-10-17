import patients from '../../data/patients';

import { NonSensitivePatientInfo } from '../types';

const getPatientInfo = (): Array<NonSensitivePatientInfo> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPatientInfo };
