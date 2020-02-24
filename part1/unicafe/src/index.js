import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Section = ({ text }) => <h2>{text}</h2>;

const Button = ({ onButtonClick, text }) => (
  <button onClick={onButtonClick}>{text}</button>
);

const Statistic = ({ name, value }) => {
  if (name === 'Positive') {
    value = `${value}%`;
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ values }) => {
  if (values.all > 0) {
    return (
      <table>
        <tbody>
          <Statistic value={values.good} name="Good" />
          <Statistic value={values.neutral} name="Neutral" />
          <Statistic value={values.bad} name="Bad" />
          <Statistic value={values.all} name="All" />
          <Statistic value={values.average || 0} name="Average" />
          <Statistic value={values.positive || 0} name="Positive" />
        </tbody>
      </table>
    );
  }

  return <p>No feedback given</p>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <Section text="Give Feedback" />
      <Button onButtonClick={() => setGood(good + 1)} text="Good" />
      <Button onButtonClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onButtonClick={() => setBad(bad + 1)} text="Bad" />
      <Section text="Statistics" />
      <Statistics values={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
