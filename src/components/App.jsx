import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import Phonebook from './Phonebook';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (newName, number) => {
    const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    const numberPattern = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    const isNotUnique = this.state.contacts.some(
      ({ name }) => name === newName,
    );
    if (isNotUnique) {
      return alert(`${newName} is already in contacts.`);
    }

    if (!namePattern.test(newName)) {
      alert('Please enter a valid name');
      return;
    }

    if (!numberPattern.test(number)) {
      alert('Please enter a valid phone number');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: newName,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filterList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <Container>
        <h1>Phonebook</h1>
        <Phonebook onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={this.filterList()}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;
