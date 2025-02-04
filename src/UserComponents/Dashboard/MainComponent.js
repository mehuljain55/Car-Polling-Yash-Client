import React, { useState } from "react";
import YashLogo from "../Image/yash.jpg";
import {  Button, Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import AddVechile from "../Vechile/AddVechile";
import AddRoute from "../Vechile/AddRoutes";
import RoutesList from "../Vechile/RoutesList";


const MainComponent = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const renderSection = () => {
    switch (activeSection) {
      // case "dashboard":
      //   return (
      //     <div>
      //     {user.role === "user" ? (
      //       <Dashboard activeSection={setActiveSection} />
      //     ) : user.role === "admin" ? (
      //       <SuperAdminDashboard activeSection={setActiveSection} />
      //     ) : (
      //       <UserDashboard />
      //     )}
      //   </div>
        
      //   );
      case "addVechile":
        return (
          <div>
            <AddVechile />
          </div>
        );

        case "addRoute":
          return (
            <div>
              <AddRoute />
            </div>
          );

          case "routesList":
            return (
              <div>
                <RoutesList />
              </div>
            );
     
            
      default:
        return (
          <div>
            <h3>404</h3>
            <p>Section not found.</p>
          </div>
        );
    }
  };

  return (
    <div className="d-flex vh-100">
      <div
        className={`sidebar d-flex flex-column bg-light ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        style={{
          width: isSidebarOpen ? "250px" : "0",
          transition: "width 0.3s ease",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className="p-4 text-center"
          style={{
            borderBottom: "1px solid #ddd",
            background: "#BFECFF",
          }}
        >
          <img
            src={YashLogo}
            alt="Company Logo"
            style={{
              height: "80px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <h5>Welcome</h5>
          {user.firstName && (
            <p>
              {user.firstName} {user.lastName}
            </p>
          )}
        </div>
        <div className="menu mt-3">
          {user.role === "user" && (
            <>
              <h6 className="px-4 text-secondary">User</h6>
              <ul className="list-unstyled px-3">
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "addVechile"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("addVechile")}
                  >
                    Add Vechile
                  </button>
                </li>
                
              </ul>

              <ul className="list-unstyled px-3">
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "addRoute"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("addRoute")}
                  >
                    Add Route
                  </button>
                </li>
                
              </ul>


              <ul className="list-unstyled px-3">
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "routesList"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("routesList")}
                  >
                    Route List
                  </button>
                </li>
                
              </ul>

            </>
          )}
          {user.role === "manager" && (
            <>
              <h6 className="px-4 text-secondary">Manager Only</h6>
              <ul className="list-unstyled px-3">
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "approveRequest"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("approveRequest")}
                  >
                    Cabin Approval
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "approveRequestVip"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("approveRequestVip")}
                  >
                    Cabin Approval VIP
                  </button>
                </li>

                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "custom_cabin_reservation"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("custom_cabin_reservation")}
                  >
                    Cabin Reservation 
                  </button>
                </li>


                
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "approveUserRequest"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("approveUserRequest")}
                  >
                    User Approval
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "viewBooking"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("viewBooking")}
                  >
                    View Booking
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "viewAllCabinRequest"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("viewAllCabinRequest")}
                  >
                    Cabin Request View
                  </button>
                </li>

           


                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "addCabin"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("addCabin")}
                  >
                     Cabin Manager
                  </button>
                </li>
              </ul>
            </>
          )}
          {user.role === "super_admin" && (
            <>
              <h6 className="px-4 text-secondary">Super Admin</h6>
              <ul className="list-unstyled px-3">
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "approveRequest"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("approveRequest")}
                  >
                    View Cabin Approval
                  </button>
                </li>
         
                
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "approveUserRequest"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("approveUserRequest")}
                  >
                    User Approval
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "viewBooking"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("viewBooking")}
                  >
                    View Booking
                  </button>
                </li>
                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "viewAllCabinRequest"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("viewAllCabinRequest")}
                  >
                    Cabin Request View
                  </button>
                </li>

                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "userManagement"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("userManagement")}
                  >
                   User Manager
                  </button>
                </li>

                <li>
                  <button
                    className={`btn btn-link text-decoration-none w-100 text-start ${
                      activeSection === "officeManagement"
                        ? "fw-bold text-primary"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveSection("officeManagement")}
                  >
                   Office Manager
                  </button>
                </li>
               
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="main-content flex-grow-1">
  <nav
    className="navbar navbar-expand-lg navbar-light"
    style={{
      background: "#1f509a",
      color: "white",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div className="container-fluid px-4 d-flex align-items-center">
      <button
        className="btn btn-light me-3"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ marginRight: "10px" }} 
      >
        ☰
      </button>
      
      <h2 className="me-3" style={{ marginRight: "20px" }}>Car Polling</h2> 
      
      <Button
        onClick={() => setActiveSection("dashboard")}
        className="navbar-brand text-white fw-bold"
        style={{ fontSize: "18px", marginRight: "20px" }} 
      >
        Dashboard
      </Button>

      <button className="btn btn-outline-light ms-auto" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </nav>
  <div className="container mt-4">{renderSection()}</div>
</div>
    </div>
  );
};

export default MainComponent;
