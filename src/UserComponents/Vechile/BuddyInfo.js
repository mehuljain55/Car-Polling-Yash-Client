import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Badge, Row, Col, Spinner, Alert } from 'reactstrap';
import { FaUserTie, FaUserFriends } from 'react-icons/fa'; // Import the icons
import API_BASE_URL from '../Config/Config';
import axios from 'axios';

const BuddyInfo = () => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuddies = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const token = sessionStorage.getItem('token');

      try {
        const requestData = {
          user: user,
          token: token,
        };

        const response = await axios.post(`${API_BASE_URL}/user/getBuddiesInfo`, requestData);

        if (response.data.status === 'success') {
          setBuddies(response.data.payload);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchBuddies();
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner color="primary" />
      <span className="ml-3">Loading...</span>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <Alert color="danger">
        {error}
      </Alert>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Buddy Information</h2>
      <Row>
        {buddies.map((buddy, index) => (
          <Col sm="12" md="6" lg="4" key={index}>
            <Card className="mb-4 shadow-sm rounded" style={{ border: '1px solid #ddd' }}>
              <CardBody>
                <CardTitle tag="h5" className="text-primary">{buddy.name}</CardTitle>
                <CardText><strong>Email:</strong> {buddy.emailId}</CardText>
                <CardText><strong>Contact:</strong> {buddy.contactNo}</CardText>
                <div className="d-flex align-items-center justify-content-between">
                  <Badge color={buddy.buddyTag === 'owner' ? 'primary' : 'secondary'} className="mr-2">
                    {buddy.buddyTag === 'owner' ? 'Owner' : 'Buddy'}
                  </Badge>
                  {/* Render appropriate icon */}
                  {buddy.buddyTag === 'owner' ? (
                    <FaUserTie color="blue" size={24} />
                  ) : (
                    <FaUserFriends color="green" size={24} />
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BuddyInfo;
