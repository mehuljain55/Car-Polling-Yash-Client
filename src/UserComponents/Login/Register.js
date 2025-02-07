import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../Config/Config";
import axios from "axios";
import CarPollingImage from "../Image/carpollingimage.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    name: "",
    mobileNo: "",
    password: "",
    haveLicence: false,
    licenceImage: null,
    licenceNo: "",
    officeId: "",
  });

  const [offices, setOffices] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/officeList`);
        setOffices(response.data.payload);
      } catch (error) {
        console.error("Error fetching office list:", error);
      }
    };
    fetchOffices();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, licenceImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      "user",
      new Blob(
        [
          JSON.stringify({
            emailId: formData.emailId,
            name: formData.name,
            mobileNo: formData.mobileNo,
            password: formData.password,
            licenceNo: formData.licenceNo,
          }),
        ],
        { type: "application/json" }
      )
    );
    formDataToSend.append("officeId", formData.officeId);

    if (formData.haveLicence && formData.licenceImage) {
      formDataToSend.append("licenceImage", formData.licenceImage);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      if (response.data.status === "success") {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    } catch (error) {
      console.log(error);
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row d-flex align-items-center justify-content-center">

       <h1>Car Polling</h1>  
    
        <div className="col-md-6 d-none d-md-block">
          <img src={CarPollingImage} alt="Car Pooling" className="img-fluid rounded shadow" style={{ height: "100%", width: "100%" }} />
        </div>

        <div className="col-md-6">
          <div className="card shadow p-4" style={{ backgroundColor: "#e3f2fd" }}>
            <h3 className="text-center text-primary">User Registration</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile No</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="haveLicence"
                  name="haveLicence"
                  checked={formData.haveLicence}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="haveLicence">
                  Have Driving Licence?
                </label>
              </div>
              {formData.haveLicence && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Upload Licence</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Licence No</label>
                    <input
                      type="text"
                      className="form-control"
                      name="licenceNo"
                      value={formData.licenceNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="mb-3">
                <label className="form-label">Select Office</label>
                <select
                  className="form-control"
                  name="officeId"
                  value={formData.officeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an office</option>
                  {offices.map((office) => (
                    <option key={office.officeId} value={office.officeId}>
                      {office.officeId} - {office.city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              </div>

              <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => navigate("/login")}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            Already have an account? Login
          </button>
        </div>
              
            </form>
            {successMessage && (
              <p className="text-success text-center mt-3">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;