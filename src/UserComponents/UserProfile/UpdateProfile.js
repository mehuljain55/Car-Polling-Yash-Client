import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import API_BASE_URL from '../Config/Config';

const UpdateProfile = ({ setActiveSection }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionStorage.getItem('token');
  
  const [licenceNo, setLicenceNo] = useState('');
  const [licenceImage, setLicenceImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    setLicenceImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!licenceNo || !licenceImage) {
      setError('Licence number and image are required.');
      return;
    }

    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('licenceNo', licenceNo);
    formData.append('token', token);
    formData.append('licenceImage', licenceImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/user/updateLicence`, formData);
      if (response.data.status === 'success') {
        console.log(response.data);
        setSuccess('Licence updated successfully!');
        sessionStorage.setItem("user", JSON.stringify(response.data.payload.user));
        setActiveSection("dashboard");
        setError('');
      } else {
        setError(response.data.message || 'Failed to update licence.');
      }
    } catch (error) {
      setError('Error updating licence. Please try again.');
      console.log(error);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Update Profile</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Licence Number</Form.Label>
            <Form.Control 
              type="text" 
              value={licenceNo} 
              onChange={(e) => setLicenceNo(e.target.value)} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Licence Image</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Update Licence</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default UpdateProfile;
