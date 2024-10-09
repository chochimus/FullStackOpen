import PersonDisplay from "./PersonDisplay";

const Persons = ({ people, deletePerson }) => {
  return (
    <>
      {people.map((person) => (
        <PersonDisplay
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </>
  );
};

export default Persons;
