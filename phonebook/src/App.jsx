import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/perons";
import noteService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      noteService.create(nameObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (evnet) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personToShow = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleSearchChange} />
      <h2>Numbers</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;

