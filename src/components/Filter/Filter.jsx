import React from 'react';
import { useDispatch } from 'react-redux';
import { filterContacts } from 'redux/contacts/contactsSlice';
import Form from 'react-bootstrap/Form';

export const Filter = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Form.Group className="mb-3" controlId="validationFormikName">
        <Form.Label>Find contacts by name</Form.Label>
        <Form.Control
          type="text"
          name="filter"
          onChange={e => dispatch(filterContacts(e.target.value.toLowerCase()))}
        />
      </Form.Group>
    </>
  );
};
