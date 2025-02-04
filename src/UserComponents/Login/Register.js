import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../Config/Config";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    name: "",
    mobileNo: "",
    password: "",
    haveLicence: false,
    licenceImage: null,
  });

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
          }),
        ],
        { type: "application/json" }
      )
    );

    if (formData.haveLicence && formData.licenceImage) {
      formDataToSend.append("licenceImage", formData.licenceImage);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("User registered successfully!");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
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
            <div className="mb-3">
              <label className="form-label">Upload Licence</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
