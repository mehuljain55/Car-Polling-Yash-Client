import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Alert } from 'react-bootstrap';
import API_BASE_URL from '../Config/Config';

const BookingRequest = () => {
 
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  const fetchBookingRequest = async () => {

    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');

    try {

    const response = await axios.post(`${API_BASE_URL}/user/findBookingRequest`, {
      user,
      token,
    });
    if (response.data.status === 'success') {
      setRequests(response.data.payload);
    } else {
      setError(response.data.message || 'Failed to fetch booking requests');
    }
  } catch (err) {
    setError('Error fetching booking requests. Please try again.');
  }
};



  useEffect(() => {
    fetchBookingRequest();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Booking Requests</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Booking ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Owner Employee ID</th>
            <th>Status</th>
            <th>Message</th>
            
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>{request.bookingId}</td>
                <td>{request.employeeID}</td>
                <td>{request.name}</td>
                <td>{request.ownerEmployeeId}</td>
                <td>{request.requestStatus}</td>
                <td>{request.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No booking requests found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingRequest;
