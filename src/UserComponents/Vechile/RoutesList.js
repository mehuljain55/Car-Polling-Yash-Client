import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Table } from "react-bootstrap";
import API_BASE_URL from "../Config/Config";

const RoutesList = () => {
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [routes, setRoutes] = useState([]);

    const fetchRoutes = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/findRoutes`, {
                params: { source, destination },
            });
            setRoutes(response.data.payload);
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
                        type="text" 
                        placeholder="Enter destination" 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                    />
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
                        <th>Driver</th>
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
                            <td>{index + 1}</td>
                            <td>{route.vechile?.vechileName} ({route.vechile?.vechileNo})</td>
                            <td>{route.vechile?.available_capacity} </td>
                            <td>{route.user?.name} ({route.user?.mobileNo})</td>
                            <td>{route.source}</td>
                            <td>{route.destination}</td>
                            <td>{route.pickUpPlaces.map(p => p.places).join(", ")}</td>
                            <td>{route.cost}</td>
                          <td>
                            <Button>Book</Button>
                          </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default RoutesList;
