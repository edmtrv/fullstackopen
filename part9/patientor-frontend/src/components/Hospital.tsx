import React, { FC } from "react";
import { Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

const Hospital: FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <h4>
        {entry.date} <Icon className="plus square"></Icon>
      </h4>
      <p>{entry.description}</p>
      <List>
        {entry.diagnosisCodes?.map((dc) => (
          <List.Item key={dc}>
            {dc} {diagnoses.find((d) => d.code === dc)?.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Hospital;
