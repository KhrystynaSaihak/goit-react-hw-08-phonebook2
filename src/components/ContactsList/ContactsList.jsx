import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import {
  selectedContacts,
  selectIsLoading,
  selectItems,
} from 'redux/contacts/selectors';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { EditContactModal } from 'components/EditContactModal';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectedContacts);

  return (
    <Row className="justify-content-md-center">
      <Col>
        <Table striped bordered hover>
          <tbody>
            {isLoading === false &&
              contacts.length !== 0 &&
              filteredContacts.map(({ id, name, number }) => {
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{number}</td>
                    <td>
                      <EditContactModal
                        contact={{ id, name, number }}
                      ></EditContactModal>{' '}
                      <Button onClick={() => dispatch(deleteContact(id))}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ContactsList;
