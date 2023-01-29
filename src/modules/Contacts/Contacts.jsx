import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import Notiflix from 'notiflix';

import items from './items';

import styles from './contacts.module.css';
import './normalize/normalize.css';

class Contacts extends Component {
  state = {
    items: [...items],
    filter: '',
  };

  removeContact = id => {
    this.setState(({ items }) => {
      const newContacts = items.filter(item => item.id !== id);
      return { items: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      Notiflix.Notify.failure(`${name}: ${number} is already in contacts`);
      return false;
    }

    this.setState(prevState => {
      const { items } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { items: [newContact, ...items] };
    });
    return true;
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number;
    const { items } = this.state;
    const result = items.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName && number === normalizedNumber
      );
    });

    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = items.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });

    return result;
  }

  render() {
    const { addContact, removeContact, handleFilter } = this;
    const items = this.getFilteredContacts();
    const isContact = Boolean(items.length);

    return (
      <div>
        <div className={styles.wrapper}>
          <h3>Phonebook</h3>
          <div className={styles.block}>
            <ContactForm onSubmit={addContact} />
          </div>
          <h4>Contacts</h4>
          <div className={styles.block}>
            <ContactsFilter handleChange={handleFilter} />
            {isContact && (
              <ContactList removeContact={removeContact} items={items} />
            )}
            {!isContact && <p>Contacts list is empty</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
