import Part from "./Part";
import Sum from "./Sum.jsx";

const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <Sum
        total={parts.reduce(
          (accumulator, currentValue) => accumulator + currentValue.exercises,
          0
        )}
      />
    </>
  );
};

export default Content;
