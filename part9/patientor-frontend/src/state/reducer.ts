import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_SINGLE_PATIENT":
      return { ...state, patient: action.payload };
    case "SET_DIAGNOSES":
      return { ...state, diagnoses: action.payload };
    case "ADD_ENTRY":
      return {
        ...state,
        patient: state.patient && {
          ...state.patient,
          entries: state.patient.entries.concat(action.payload),
        },
      };
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data,
  };
};

export const setSinglePatient = (data: Patient): Action => {
  return {
    type: "SET_SINGLE_PATIENT",
    payload: data,
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data,
  };
};

export const setDiagnoses = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: data,
  };
};

export const addEntry = (data: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: data,
  };
};
