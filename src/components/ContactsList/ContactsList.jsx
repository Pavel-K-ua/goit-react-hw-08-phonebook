import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  // selectError,
  selectFilter,
  selectLoading,
} from 'redux/contacts/selectors';
import {
  deleteContactThunk,
  fetchContactsThunk,
} from 'redux/contacts/operations';
import { useEffect } from 'react';

const ContactsList = () => {
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

  const filteredContacts = (data, filter) => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  return (
    <>
      {loading && <h2>Loading</h2>}
      {/* {error && <h1>{error}</h1>} */}
      {!filteredContacts(contacts, filter).length ? (
        <h2>No contacts</h2>
      ) : (
        <ul>
          {filteredContacts(contacts, filter).map(contact => (
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
      )}
    </>
  );
};

export default ContactsList;
