import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import VehicleDetailModal from "./VehicleDetailModal";
import API_BASE_URL from "../Config/Config";

const VechileApprovalList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
  
    const requestData = {
      user: user,
      token: token,
      officeId: "YIT",
    };
  
    axios
      .post(`${API_BASE_URL}/manager/verifyVechile`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data && response.data.payload) {
          setVehicles(response.data.payload);
        } else {
          console.error("Unexpected response structure", response.data);
        }
      })
      .catch((error) => console.error("Error fetching vehicles", error));
  }, []);
  

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const handleAccept = async (vehicleNo) => {
   
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
  
    const requestPayload = {
        token,
        user: user,
        token: token,
        vechileNo:vehicleNo,
        vechileStatus: "approved"
      };
      const response = await axios.post(`${API_BASE_URL}/manager/updateVechileStatus`, requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);


    
  };

  const handleReject = async (vehicleNo) => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
  
    const requestPayload = {
        token,
        user: user,
        token: token,
        vechileNo:vehicleNo,
        vechileStatus: "rejected"
      };
      const response = await axios.post(`${API_BASE_URL}/manager/updateVechileStatus`, requestPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert(response.data.message);
  };

  return (
    <div>
      <h1>Vehicle List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vehicle No</th>
            <th>Vehicle Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vechileNo}>
              <td>{vehicle.vechileNo}</td>
              <td>{vehicle.vechileName}</td>
              <td>{vehicle.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleViewDetails(vehicle)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedVehicle && (
        <VehicleDetailModal
          show={showModal}
          onHide={() => setShowModal(false)}
          vehicle={selectedVehicle}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default VechileApprovalList;