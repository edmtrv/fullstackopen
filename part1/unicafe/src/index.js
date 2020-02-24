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
    <p>
      {name} {value}
    </p>
  );
};

const Statistics = ({ feedback }) => {
  if (feedback.all > 0) {
    return (
      <div>
        <Statistic value={feedback.good} name="Good" />
        <Statistic value={feedback.neutral} name="Neutral" />
        <Statistic value={feedback.bad} name="Bad" />
        <Statistic value={feedback.all} name="All" />
        <Statistic value={feedback.average || 0} name="Average" />
        <Statistic value={feedback.positive || 0} name="Positive" />
      </div>
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
      <Statistics feedback={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
