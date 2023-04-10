import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ContactsList from 'components/ContactsList/ContactsList';
import Container from 'react-bootstrap/Container';
import { fetchContacts } from 'redux/contacts/operations';
import { AddEditContact } from 'components/AddEditContact/AddEditContact';
import { Filter } from 'components/Filter/Filter';

const Contacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container className="d-grid gap-3">
      <h1>My Contacts Book</h1>
      <AddEditContact />
      <Filter />
      <ContactsList />
    </Container>
  );
};

export default Contacts;
