import React, { useState, useEffect } from 'react';
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
    vechileNo: '',
  });

  const [offices, setOffices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [city, setCity] = useState(""); // City state to be updated when destination is selected

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/officeList`);
        if (response.data.status === 'success') {
          setOffices(response.data.payload);
        }
      } catch (error) {
        console.error('Error fetching offices', error);
      }
    };

    const fetchVehicles = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.post(`${API_BASE_URL}/user/getVechileList`, { user, token });
        if (response.data.status === 'success') {
          setVehicles(response.data.payload);
        }
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchOffices();
    fetchVehicles();
  }, []);

  useEffect(() => {
    const selectedOffice = offices.find((office) => office.officeId === formData.destination);
    if (selectedOffice) {
      setCity(selectedOffice.city); 
    }
  }, [formData.destination, offices]); 

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
      user,
      token,
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
      vechileNo: formData.vechileNo,
      city: city, 
    };

    console.log(requestPayload);

    try {
      const response = await axios.post(`${API_BASE_URL}/routes/addRoute`, requestPayload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error adding route');
    }
  };

  const handleDestinationChange = (e) => {
    const selectedOfficeId = e.target.value;
    setFormData({ ...formData, destination: selectedOfficeId });
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
            <select
              className="form-control"
              name="destination"
              value={formData.destination}
              onChange={handleDestinationChange} // Updated handler
              required
            >
              <option value="">Select Destination</option>
              {offices.map((office) => (
                <option key={office.officeId} value={office.officeId}>
                  {office.officeId} - {office.city}
                </option>
              ))}
            </select>
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

          <div className="mb-3">
            <label className="form-label">Select Vehicle</label>
            <select
              className="form-control"
              name="vechileNo"
              value={formData.vechileNo}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.vechileNo} value={vehicle.vechileNo}>
                  {vehicle.vechileNo} - {vehicle.vechileName} ({vehicle.vechileType})
                </option>
              ))}
            </select>
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
