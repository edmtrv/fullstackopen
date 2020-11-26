import React, { FC } from "react";
import { Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { OccupationalHealthEntry } from "../types";

const OccupationalHealth: FC<{ entry: OccupationalHealthEntry }> = ({
  entry,
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <h4>
        {entry.date} <Icon className="hospital"></Icon>
        {entry.employerName}
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

export default OccupationalHealth;
