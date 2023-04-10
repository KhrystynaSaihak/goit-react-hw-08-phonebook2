import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [validated, setValidated] = useState(false);
  const onEmailInput = ({ target: { value } }) => setEmail(value);
  const onPasswordInput = ({ target: { value } }) => setPassword(value);
  const onNameInput = ({ target: { value } }) => setName(value);
  const onFormSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      dispatch(
        register({
          email,
          password,
          name,
        })
      )
        .unwrap()
        .then(data => {
          setEmail('');
          setPassword('');
          setName('');
        })
        .catch(error => setShow(true));
    }
  };

  return (
    <Container>
      {show ? (
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>Change name or email and try again.</p>
            </Alert>{' '}
          </Col>
        </Row>
      ) : null}
      <Row className="justify-content-md-center">
        <Col xs lg="4" className="bg-light border">
          <Form
            onSubmit={onFormSubmit}
            noValidate
            validated={validated}
            className="d-grid"
          >
            <h1>SIGH UP</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  onChange={onNameInput}
                  value={name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={onEmailInput}
                  value={email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter an email.
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onPasswordInput}
                  value={password}
                  minLength={7}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a password (min minimum password length 7
                  characters).
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3 d-grid">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
