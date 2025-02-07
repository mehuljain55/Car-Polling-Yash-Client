import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";
import API_BASE_URL from "../Config/Config";
import RouteTimeline from "./RouteTimeline";

const RoutesList = () => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [city, setCity] = useState(""); 
    const [routes, setRoutes] = useState([]);
    const [offices, setOffices] = useState([]); 


    const [selectedRoute, setSelectedRoute] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleView = (route) => {
        console.log('View Routes'); 
        setSelectedRoute(route);
        setShowModal(true);
    };
    

    const createBooking = async (routeId) => {
     
        const user = JSON.parse(sessionStorage.getItem('user'));
        const token = sessionStorage.getItem('token');
    
        const requestData = {
            user: user,
            token: token, 
            routeId: routeId, 
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/user/createBooking`, requestData);
            if (response.data.status === "success") {
                alert(response.data.message);
            } else {
                alert(response.data.message || "Failed to create booking.");
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("An error occurred while creating the booking.");
        }
    };

    useEffect(() => {
        const fetchOffices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/officeList`);
                if (response.data.status === "success") {
                    setOffices(response.data.payload);
                }
            } catch (error) {
                console.error("Error fetching offices:", error);
            }
        };

        fetchOffices();
    }, []);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/routes/findRoutes`, {
                params: { source, destination, city },
            });
            setRoutes(response.data.payload);
            console.log("Routes");
            console.log(response.data.payload);
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Find Routes</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Source</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter source" 
                        value={source} 
                        onChange={(e) => setSource(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control 
                        as="select"
                        value={destination}
                        onChange={(e) => {
                            const selectedOffice = offices.find(office => office.officeId === e.target.value);
                            setDestination(e.target.value);
                            setCity(selectedOffice ? selectedOffice.city : "");
                        }}
                    >
                        <option value="">Select Destination</option>
                        {offices.map((office) => (
                            <option key={office.officeId} value={office.officeId}>
                                {office.officeId} - {office.city}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" onClick={fetchRoutes}>
                    Search
                </Button>
            </Form>

            <h3 className="mt-4">Available Routes</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Route Id</th>
                        <th>Vehicle</th>
                        <th>Available Capacity</th>
                        <th>Employee Name & Contact</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Pick-Up Places</th>
                        <th>Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {routes.map((route, index) => (
                        <tr key={route.routeId}>
                            <td>{route.routeId}</td>
                            <td>{route.vechile?.vechileName} ({route.vechile?.vechileNo})</td>
                            <td>{route.vechile?.available_capacity}</td>
                            <td>{route.user?.name} ({route.user?.mobileNo})</td>
                            <td>{route.source}</td>
                            <td>{route.destination}</td>
                            <td>{route.pickUpPlaces.map(p => p.places).join(", ")}</td>
                            <td>{route.cost}</td>
                            <td>
                                <Button onClick={() => createBooking(route.routeId)}>Book</Button>
                                <Button onClick={() => handleView(route)}>View</Button>
                            
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <RouteTimeline show={showModal} handleClose={() => setShowModal(false)} route={selectedRoute} />
        </Container>
    );
};

export default RoutesList;
