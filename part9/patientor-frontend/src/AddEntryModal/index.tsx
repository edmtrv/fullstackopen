import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import AddHealthCheckEntryForm from "./AddHealthCheckEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalHealthcareEntryForm from "./AddOccupationalHealthcareEntryForm";
import { EntryFormValues } from "../types";
import { useStateValue } from "../state";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [{ entryType }] = useStateValue();

  const addEntryForm = () => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        );
      case "OccupationalHealthcare":
        return (
          <AddOccupationalHealthcareEntryForm
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        );
      case "Hospital":
        return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      default:
        return assertNever(entryType);
    }
  };
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {addEntryForm()}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
