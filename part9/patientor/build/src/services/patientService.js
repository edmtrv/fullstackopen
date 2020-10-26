"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatientsInfo = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const getPatient = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v4() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = { getPatientsInfo, addPatient, getPatient };
