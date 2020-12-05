import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Segment, Icon, Button, Select } from "semantic-ui-react";

import { Entry, Patient, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { addEntry, setSinglePatient, setEntryType } from "../state/reducer";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";

const SinglePatient: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: singlePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setSinglePatient(singlePatient));
      } catch (e) {
        console.log(e);
      }
    };
    fetchPatient();
  }, [dispatch]);

  const selectOptions = [
    { key: "HealthCheck", value: "HealthCheck", text: "HealthCheck" },
    {
      key: "OccupationalHealthcare",
      value: "OccupationalHealthcare",
      text: "OccupationalHealthcare",
    },
    { key: "Hospital", value: "Hospital", text: "Hospital" },
  ];

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return null;
  }
  return (
    <div>
      <Container>
        <h2>
          {patient.name}{" "}
          <Icon className={patient.gender === "male" ? "mars" : "venus"}></Icon>
        </h2>
        <p>
          ssn: {patient.ssn}
          <br />
          occupation: {patient.occupation}
        </p>
        <h3>Entries</h3>
        <Select
          onChange={({ currentTarget }) =>
            dispatch(
              setEntryType(
                currentTarget.textContent as
                  | "HealthCheck"
                  | "OccupationalHealthcare"
                  | "Hospital"
              )
            )
          }
          defaultValue={selectOptions[0].value}
          placeholder="Select entry type"
          options={selectOptions}
        />
        <Button onClick={() => openModal()}>Add Entry</Button>
        {patient.entries.map((e) => (
          <Segment key={e.id}>
            <EntryDetails entry={e} />
          </Segment>
        ))}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
    </div>
  );
};

export default SinglePatient;
