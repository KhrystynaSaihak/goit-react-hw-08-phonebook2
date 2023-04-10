import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from 'redux/auth/operations';
import Contacts from './../../pages/Contacts';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './../RestrictedRoute';
import { PrivateRoute } from './../PrivateRoute';
import SignUp from '../../pages/SignUp';
import Login from '../../pages/Login';
import Layout from './../Layout';
import { selectIsRefreshing } from 'redux/auth/selectors';
import Spinner from 'react-bootstrap/Spinner';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Container className="d-grid gap-3">
        {isRefreshing ? (
          <Spinner
            animation="border"
            variant="primary"
            gap={2}
            className="col-md-5 mx-auto"
          />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/contacts"
                element={
                  <PrivateRoute redirectTo="/login" component={<Contacts />} />
                }
              ></Route>
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<SignUp />}
                  />
                }
              ></Route>
              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/contacts"
                    component={<Login />}
                  />
                }
              ></Route>
              <Route
                path="/logout"
                element={<PrivateRoute redirectTo="/" />}
              ></Route>
            </Route>

            <Route path="*" element={<p>Path not resolved</p>} />
          </Routes>
        )}
      </Container>
    </>
  );
};
