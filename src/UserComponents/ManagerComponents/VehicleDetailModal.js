import React from "react";
import { Modal, Button } from "react-bootstrap";

const VehicleDetailModal = ({ show, onHide, vehicle, onAccept, onReject }) => {
  const imageUrl = `data:image/jpeg;base64,${vehicle.image}`;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Vehicle Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Vehicle No:</strong> {vehicle.vechileNo}</p>
        <p><strong>Vehicle Name:</strong> {vehicle.vechileName}</p>
        <p><strong>Status:</strong> {vehicle.status}</p>
        <p><strong>RC Status:</strong> {vehicle.rc_status}</p>
        <p><strong>Max Capacity:</strong> {vehicle.max_capacity}</p>
        <p><strong>Available Capacity:</strong> {vehicle.available_capacity}</p>
        <img 
          src={imageUrl} 
          alt="RC" 
          style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} 
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => onAccept(vehicle.vechileNo)}>Accept</Button>
        <Button variant="danger" onClick={() => onReject(vehicle.vechileNo)}>Reject</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VehicleDetailModal;