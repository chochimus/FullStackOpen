import { useEffect, useState } from "react";
import Persons from "../components/Persons";
import PersonForm from "../components/PersonForm";
import Header from "../components/Header";
import Filter from "../components/Filter";
import personService from "../services/persons";
import Notification from "../components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    msg: null,
    statusCode: null,
  });

  useEffect(() => {
    personService.getAll().then((returnedPerson) => {
      setPersons(returnedPerson);
    });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const personObject = {
          ...personToUpdate,
          number: newNumber,
        };
        personService
          .update(personToUpdate.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setNotificationMessage({
              msg: `${returnedPerson.name} was successfully updated!`,
              statusCode: null,
            });
            setTimeout(() => {
              setNotificationMessage({ msg: null, statusCode: null });
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage({
              msg: `${personToUpdate.name} has already been removed from the server`,
              statusCode: 1,
            });
            setTimeout(() => {
              setNotificationMessage({ msg: null, statusCode: null });
            }, 5000);
            setPersons(persons.filter((p) => p.name !== newName));
          });
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setNotificationMessage({
        msg: `${returnedPerson.name} was successfully added!`,
        statusCode: null,
      });
      setTimeout(() => {
        setNotificationMessage({ msg: null, statusCode: null });
      }, 5000);
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleSearch = (e) => setSearchName(e.target.value);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={notificationMessage} />
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <Header text="add a new" />
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
      />
      <Header text="Numbers" />
      <Persons people={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
