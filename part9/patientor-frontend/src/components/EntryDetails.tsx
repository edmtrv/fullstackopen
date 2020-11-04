import React from "react";
import { Entry } from "../types";
import OccupationalHealth from "./OccupationalHealth";
import Hospital from "./Hospital";
import HealthCheck from "./HealthCheck";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealth entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
