import React, { FC } from "react";
import { Icon, List } from "semantic-ui-react";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";

const HealthCheck: FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <div>
      <h4>
        {entry.date} <Icon className="doctor"></Icon>
      </h4>
      <p>{entry.description}</p>
      <List>
        {entry.diagnosisCodes?.map((dc) => (
          <List.Item key={dc}>
            {dc} {diagnosis && diagnosis.find((d) => d.code === dc)?.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default HealthCheck;
