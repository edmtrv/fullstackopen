/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/parsePatient';
import toNewEntry from '../utils/parseEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsInfo());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (!patient) {
    return res.status(400).send('No patient with this id');
  }

  return res.json(patient);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
