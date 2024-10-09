const Part = ({ part }) => {
  return (
    <li>
      <p>
        {part.name} {part.exercises}
      </p>
    </li>
  );
};

export default Part;
