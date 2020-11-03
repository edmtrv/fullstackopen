import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { setSinglePatient } from "../state/reducer";

const SinglePatient: React.FC = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();
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

  console.log(diagnosis);
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
        <h4>Entries</h4>
        {patient.entries.map((e) => (
          <div key={e.id}>
            <p>
              {e.date} {e.description}
            </p>
            <ul>
              {e.diagnosisCodes?.map((dc) => (
                <li key={dc}>
                  {dc} {diagnosis && diagnosis.find((d) => d.code === dc)?.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default SinglePatient;
