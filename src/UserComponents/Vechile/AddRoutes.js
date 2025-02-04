import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../Config/Config';

const AddRoute = () => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    startDate: '',
    endDate: '',
    cost: '',
    pickUpPlaces: [{ place: '', time: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePickupChange = (index, field, value) => {
    const updatedPickups = [...formData.pickUpPlaces];
    updatedPickups[index][field] = value;
    setFormData({ ...formData, pickUpPlaces: updatedPickups });
  };

  const addPickupPlace = () => {
    setFormData({
      ...formData,
      pickUpPlaces: [...formData.pickUpPlaces, { place: '', time: '' }],
    });
  };

  const removePickupPlace = (index) => {
    const updatedPickups = [...formData.pickUpPlaces];
    updatedPickups.splice(index, 1);
    setFormData({ ...formData, pickUpPlaces: updatedPickups });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');


    const requestPayload = {
      user: user,
      token: token,
      routes: {
        source: formData.source,
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        cost: parseInt(formData.cost),
        pickUpPlaces: formData.pickUpPlaces.map((p) => ({
          places: p.place,
          time: p.time,
        })),
      },
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/user/addRoute`, requestPayload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error adding route');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow p-4" style={{ backgroundColor: '#e3f2fd' }}>
        <h3 className="text-center text-primary">Add Route</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Source</label>
            <input
              type="text"
              className="form-control"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Destination</label>
            <input
              type="text"
              className="form-control"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cost</label>
            <input
              type="number"
              className="form-control"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              required
            />
          </div>

          <h5>Pickup Places</h5>
          {formData.pickUpPlaces.map((pickup, index) => (
            <div key={index} className="mb-3 d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Pickup Place"
                value={pickup.place}
                onChange={(e) => handlePickupChange(index, 'place', e.target.value)}
                required
              />
              <input
                type="time"
                className="form-control me-2"
                value={pickup.time}
                onChange={(e) => handlePickupChange(index, 'time', e.target.value)}
                required
              />
              {formData.pickUpPlaces.length > 1 && (
                <button type="button" className="btn btn-danger" onClick={() => removePickupPlace(index)}>
                  X
                </button>
              )}
            </div>
          ))}

          <button type="button" className="btn btn-secondary mb-3" onClick={addPickupPlace}>
            Add Pickup Place
          </button>

          <button type="submit" className="btn btn-primary w-100">
            Add Route
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoute;
