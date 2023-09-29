import AddContacts from './AddContacts/AddContacts';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  // selectError,
  selectFilter,
  selectLoading,
} from 'redux/selectors';
import FilterContacts from './FilterContacts/FilterContacts';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from 'redux/operations';
import { useEffect } from 'react';

const App = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  console.log(loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  const handleAddContact = contact => {
    console.log(contact);
    const item = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (item) {
      alert(`${contact.name} is already in contacts`);
    } else {
      dispatch(addContactThunk(contact));
    }
  };

  const filteredContactsArr = (data, filter) => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <AddContacts addContact={handleAddContact} />

      <h2>Contacts</h2>
      <FilterContacts />
      {loading && <h2>Loading</h2>}
      {/* {error && <h1>{error}</h1>} */}
      <ul>
        {filteredContactsArr(contacts, filter).map(contact => (
          <li key={contact.id}>
            <p>
              {contact.name}: <span>{contact.number}</span>
            </p>
            <button onClick={() => handleDeleteContact(contact.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
