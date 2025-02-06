import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container,Button, Row, Col } from "react-bootstrap";
import RouteTimeline from "../Vechile/RouteTimeline";
import API_BASE_URL from "../Config/Config";


const BookingRouteTimelines = ({ route,fetchBookings }) => {
    if (!route) return <p>No route data available</p>;

    const requestBookingCancellation = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const token = sessionStorage.getItem('token');

            const response = await axios.post(`${API_BASE_URL}/user/cancelBooking`, { user, token });
            if (response.data.status === "success") {
                alert(response.data.message);
            }else{
                alert(response.data.message);
            }
            fetchBookings();
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };

    return (
        <Card className="p-4 shadow-lg">
        <h4>Route Timeline</h4>
        <Row>
            <Col><strong>Source:</strong> {route.source}</Col>
        </Row>
        {route.pickUpPlaces && route.pickUpPlaces.length > 0 ? (
            route.pickUpPlaces.map((place, index) => (
                <Row key={index} className="mt-2">
                    <Col><strong>Stop:</strong> {place.places}</Col>
                    <Col><strong>Time:</strong> {place.time}</Col>
                </Row>
            ))
        ) : (
            <p>No pickup places available.</p>
        )}
        <Row className="mt-3">
            <Col><strong>Destination:</strong> {route.destination}</Col>
        </Row>
        <Row className="mt-3">
    <Col>
        <Button 
            onClick={requestBookingCancellation} 
            variant="danger"
        >
            Cancel Booking
        </Button>
    </Col>
</Row>

    </Card>
    );
};

const BookingDashboard = () => {
    const [booking, setBooking] = useState(null);

    const fetchBookings = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const token = sessionStorage.getItem('token');

            const response = await axios.post(`${API_BASE_URL}/user/findMyBookings`, { user, token });
            if (response.data.status === "success") {
                setBooking(response.data.payload.routes);
            }else{
                setBooking(null);
            }
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };
  

    useEffect(() => {
        fetchBookings();
    }, []);

    if (!booking) {
        return (
            <Container className="mt-4">
                <h2>Booking Dashboard</h2>
                <div className="alert alert-warning" role="alert">
                    No booking found.
                </div>
            </Container>
        );
    }


    return (
        <Container className="mt-4">
            <h2>Booking Dashboard</h2>
            <Card className="p-4 shadow-lg">
                <Row>
                    <Col md={6}><strong>Booking ID:</strong> {booking.bookingId}</Col>
                    <Col md={6}><strong>Cost:</strong> ₹{booking.cost}</Col>
                </Row>
                <Row className="mt-3">
                    <Col md={6}><strong>Vehicle:</strong> {booking.vechile.vechileName} ({booking.vechile.vechileNo})</Col>
                    <Col md={6}><strong>Pickup Contact:</strong> {booking.user.name} ({booking.user.mobileNo})</Col>
                </Row>
                <Row className="mt-3">
                    <Col md={6}><strong>Source:</strong> {booking.source}</Col>
                    <Col md={6}><strong>Destination:</strong> {booking.destination}</Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                    <BookingRouteTimelines route={booking} fetchBookings={fetchBookings} />

                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default BookingDashboard;
