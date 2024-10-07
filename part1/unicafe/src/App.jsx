import { useState } from "react";

const Statistics = ({ good, bad, neutral }) => {
  let total = good + neutral + bad;
  let avg = total == 0 ? "N/A" : (good - bad) / total;
  let pos = total == 0 ? "N/A" : 100 * (good / total);

  if (total === 0) {
    return (
      <>
        <Header text="statistics" />
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <Header text="statistics" />
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="total" value={total} />
          <StatisticsLine text="average" value={avg} />
          <StatisticsLine text="positive" value={pos} />
        </tbody>
      </table>
    </>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
