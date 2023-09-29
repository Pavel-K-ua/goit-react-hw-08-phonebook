import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContactThunk } from 'redux/operations';

const AddContacts = () => {
  const [state, setState] = useState({ name: '', number: '', id: '' });
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChangeInput = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact(state);
    setState({
      id: '',
      name: '',
      number: '',
    });
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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        onChange={handleChangeInput}
        value={state.name}
        type="text"
        name="name"
        id="name"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        onChange={handleChangeInput}
        value={state.number}
        type="tel"
        name="number"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};
AddContacts.propTypes = {
  addContact: PropTypes.func,
};
export default AddContacts;
