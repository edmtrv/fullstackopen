import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h2>{text}</h2>;

const Button = ({ onButtonClick, text }) => (
  <button onClick={onButtonClick}>{text}</button>
);

const Category = ({ name, count }) => (
  <p>
    {name} {count}
  </p>
);

const Stats = ({ counts }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <Category count={counts.good} name="Good" />
      <Category count={counts.neutral} name="Neutral" />
      <Category count={counts.bad} name="Bad" />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="Give Feedback" />
      <Button onButtonClick={() => setGood(good + 1)} text="Good" />
      <Button onButtonClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onButtonClick={() => setBad(bad + 1)} text="Bad" />
      <Stats counts={{ good, neutral, bad }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
