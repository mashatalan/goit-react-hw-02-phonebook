import React, { Component } from 'react';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  render() {
    return (
    <Container>
      <h1>Phonebook</h1>

      <h2>Contacts</h2>
    </Container>
    );


  }
}
export default App;
