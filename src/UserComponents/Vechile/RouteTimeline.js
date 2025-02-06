import React from "react";
import { Modal } from "react-bootstrap";
import "./RouteTimeline.css"; // We'll define custom styles for the timeline

const RouteTimeline = ({ show, handleClose, route }) => {
    if (!route) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Route Timeline</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Vehicle: {route.vechile?.vechileName} ({route.vechile?.vechileNo})</h4>
                <h5>Driver: {route.user?.name} ({route.user?.mobileNo})</h5>
                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                            <h5>Start: {route.source}</h5>
                        </div>
                    </div>

                    {route.pickUpPlaces.map((place, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-dot" />
                            <div className="timeline-content">
                                <h5>{place.places} - {place.time}</h5>
                            </div>
                        </div>
                    ))}

                    <div className="timeline-item">
                        <div className="timeline-dot" />
                        <div className="timeline-content">
                            <h5>End: {route.destination}</h5>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default RouteTimeline;
