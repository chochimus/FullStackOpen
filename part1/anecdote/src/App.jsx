import { useState } from "react";

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const AnecdoteDisplay = ({ anecdotes, selected }) => {
  return <div>{anecdotes[selected]}</div>;
};

const VotesDisplay = ({ votes, selected }) => {
  return <div>has {votes[selected]} votes</div>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const getMostVoted = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const mostVotedIndex = Object.keys(votes).find(
      (key) => votes[key] === maxVotes
    );
    return mostVotedIndex;
  };

  const getRandom = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const getQuote = () => {
    setSelected(getRandom());
  };

  const handleVoteClick = () => {
    setVote({ ...votes, [selected]: votes[selected] + 1 });
  };

  return (
    <>
      <Header text="Anecdote of the day" />
      <AnecdoteDisplay anecdotes={anecdotes} selected={selected} />
      <VotesDisplay votes={votes} selected={selected} />
      <Button text="vote" onClick={handleVoteClick} />
      <Button text="next anecdote" onClick={getQuote} />
      <Header text="Anecdote with the most votes" />
      <AnecdoteDisplay anecdotes={anecdotes} selected={getMostVoted()} />
    </>
  );
};

export default App;
