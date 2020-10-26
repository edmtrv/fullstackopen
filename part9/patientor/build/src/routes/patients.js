"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatientsInfo());
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
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
exports.default = router;
