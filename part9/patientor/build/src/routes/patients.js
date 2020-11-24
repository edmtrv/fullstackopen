"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const parsePatient_1 = __importDefault(require("../utils/parsePatient"));
const parseEntry_1 = __importDefault(require("../utils/parseEntry"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientsInfo());
});
router.post('/', (req, res) => {
    try {
        const newPatient = parsePatient_1.default(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatient(req.params.id);
    if (!patient) {
        return res.status(400).send('No patient with this id');
    }
    return res.json(patient);
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = parseEntry_1.default(req.body);
        const addedEntry = patientService_1.default.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
