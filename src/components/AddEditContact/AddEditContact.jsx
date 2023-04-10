import React from 'react';
import { useState } from 'react';

import { Formik } from 'formik';
import { userSchema } from 'components/validation';

import { useSelector } from 'react-redux/es/exports';
import { addContact } from 'redux/contacts/operations';
import { useDispatch } from 'react-redux';
import { selectItems } from 'redux/contacts/selectors';
import { editContact } from 'redux/contacts/operations';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

export const AddEditContact = ({ edit, contact }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(selectItems);

  const checkIfContactExists = ({ name, number }) => {
    return contacts.some(
      contact => contact.name === name || contact.number === number
    );
  };

  return (
    <>
      {show ? (
        <Row className="justify-content-md-center">
          <Col xs lg={!edit ? '4' : '10'}>
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Such contact already exists</Alert.Heading>
            </Alert>
          </Col>
        </Row>
      ) : null}
      <Row className="justify-content-md-center">
        <Col xs lg={!edit ? '4' : '10'} className="bg-light border">
          <h2>
            {edit
              ? `Edit contact - ${contact.name}, ${contact.number}`
              : 'Add new contact'}
          </h2>
          <Formik
            initialValues={{ name: '', number: '' }}
            validationSchema={userSchema}
            onSubmit={(values, { resetForm }) => {
              const contactExists = checkIfContactExists(values);
              if (!contactExists) {
                edit
                  ? dispatch(editContact({ id: contact.id, values }))
                  : dispatch(addContact(values));

                resetForm({ name: '', number: '' });
              } else {
                setTimeout(() => {
                  setShow(false);
                }, 3000);
                setShow(true);
              }
            }}
          >
            {({ handleChange, values, errors, handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="validationFormikName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="validationFormikNumber">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="number"
                    value={values.number}
                    onChange={handleChange}
                    isInvalid={!!errors.number}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 d-grid">
                  <Button type="submit" variant="primary">
                    {!edit ? 'Add contact' : 'Edit contact'}
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};
