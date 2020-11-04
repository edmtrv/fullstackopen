import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Segment, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { setSinglePatient } from "../state/reducer";
import EntryDetails from "../components/EntryDetails";

const SinglePatient: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

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
        {patient.entries.map((e) => (
          <Segment key={e.id}>
            <EntryDetails entry={e} />
          </Segment>
        ))}
      </Container>
    </div>
  );
};

export default SinglePatient;
