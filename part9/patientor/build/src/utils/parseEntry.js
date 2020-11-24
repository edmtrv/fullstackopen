"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const types_1 = require("../types");
const toNewEntry = (object) => {
    const type = object.type;
    if (!type || !isType(type)) {
        throw new Error(`Invalid type ${type}`);
    }
    const entry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
    };
    if (object.diagnosisCodes)
        entry.diagnosisCodes = parseDiagnosis(object.diagnosisCodes);
    switch (type) {
        case 'HealthCheck':
            return Object.assign(Object.assign({}, entry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        case 'OccupationalHealthcare':
            const obj = Object.assign(Object.assign({}, entry), { type: 'OccupationalHealthcare', employerName: parseEmployerName(object.employerName) });
            if (object.sickLeave)
                obj.sickLeave = parseSickLeave(object.sickLeave);
            return obj;
        case 'Hospital':
            return Object.assign(Object.assign({}, entry), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
        default:
            return assertNever(type);
    }
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description ${description}`);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date ${date}`);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist ${specialist}`);
    }
    return specialist;
};
const parseDiagnosis = (diagnosisCodes) => {
    if (!isArray(diagnosisCodes)) {
        throw new Error(`Incorrect diagnosis code ${diagnosisCodes}`);
    }
    return diagnosisCodes;
};
const parseHealthCheckRating = (rating) => {
    if (!isHealthCheckRating(rating)) {
        throw new Error(`Incorrect or missing health check rating ${rating}`);
    }
    return rating;
};
const parseEmployerName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing employer name ${name}`);
    }
    return name;
};
const parseSickLeave = (sickLeave) => {
    if (!isSickLeave(sickLeave)) {
        throw new Error(`Incorrect sick leave ${sickLeave}`);
    }
    return sickLeave;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(`Incorrect or missing discharge ${discharge}`);
    }
    return discharge;
};
const isString = (text) => {
    return typeof text === 'string';
};
const isArray = (param) => {
    return Array.isArray(param);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const isSickLeave = (param) => {
    return (Object.keys(param).includes('startDate') &&
        Object.keys(param).includes('endDate'));
};
const isDischarge = (param) => {
    return (Object.keys(param).includes('date') &&
        Object.keys(param).includes('criteria'));
};
const isType = (param) => {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param);
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.default = toNewEntry;
