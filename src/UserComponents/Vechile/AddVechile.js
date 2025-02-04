import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../Config/Config";
import axios from "axios";

const AddVechile = () => {
  const [formData, setFormData] = useState({
    vechileNo: "",
    vechileType: "",
    vechileName: "",
    max_capacity: "",
  });


  const [rcImage, setRcImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setRcImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');

    const formDataToSend = new FormData();
    
    formDataToSend.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            user: user,
            token: token,
            vechile: {
              vechileNo: formData.vechileNo,
              vechileType: formData.vechileType,
              vechileName: formData.vechileName,
              max_capacity: formData.max_capacity,
            },
          }),
        ],
        { type: "application/json" }
      )
    );

    if (rcImage) {
      formDataToSend.append("vechileImage", rcImage);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/vechile/addVechile`, 
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Vehicle registered successfully!");
    } catch (error) {
      alert("Error registering vehicle");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4" style={{ backgroundColor: "#e3f2fd" }}>
        <h3 className="text-center text-primary">Vehicle Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Vehicle No</label>
            <input
              type="text"
              className="form-control"
              name="vechileNo"
              value={formData.vechileNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle Name</label>
            <input
              type="text"
              className="form-control"
              name="vechileName"
              value={formData.vechileName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle Type</label>
            <select
              className="form-control"
              name="vechileType"
              value={formData.vechileType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="two_wheeler">Two Wheeler</option>
              <option value="four_wheeler">Four Wheeler</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Max Capacity</label>
            <input
              type="number"
              className="form-control"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Upload RC</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVechile;