import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { logOut } from 'redux/auth/operations';

const Header = () => {
  const isRegistered = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        {!isRegistered ? (
          <Navbar.Brand as={Link} to="/">
            HOME
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} to="/contacts">
            CONTACTS
          </Navbar.Brand>
        )}

        <Nav className="me-auto">
          {!isRegistered ? (
            <>
              <Nav.Link as={Link} to="/login">
                LOG IN
              </Nav.Link>

              <Nav.Link as={Link} to="/register">
                SIGH UP
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to="/logout"
                onClick={() => dispatch(logOut())}
              >
                LOG OUT
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
