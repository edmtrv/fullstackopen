import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h2>{text}</h2>;

const Button = ({ onButtonClick, text }) => (
  <button onClick={onButtonClick}>{text}</button>
);

const Category = ({ name, total }) => {
  if (name === 'Positive' && total > 0) {
    total = `${total}%`;
  }

  return (
    <p>
      {name} {total}
    </p>
  );
};

const Stats = ({ feedback }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <Category total={feedback.good} name="Good" />
      <Category total={feedback.neutral} name="Neutral" />
      <Category total={feedback.bad} name="Bad" />
      <Category total={feedback.all} name="All" />
      <Category total={feedback.average || 0} name="Average" />
      <Category total={feedback.positive || 0} name="Positive" />
    </div>
  );
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
      <Header text="Give Feedback" />
      <Button onButtonClick={() => setGood(good + 1)} text="Good" />
      <Button onButtonClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onButtonClick={() => setBad(bad + 1)} text="Bad" />
      <Stats feedback={{ good, neutral, bad, all, average, positive }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
