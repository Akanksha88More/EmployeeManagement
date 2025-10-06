import React, { useState } from "react";
import axios from "axios";
function Add() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ API endpoint (replace with your backend URL)
      const response = await axios.post("http://localhost:8080/Api/Employees/Add", formData);

      setMessage("Employee added successfully!");
      console.log("Response:", response.data);

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        position: ""
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage("Failed to add employee. Please try again.");
    }
  };


  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <h3 className="text-center mb-4 text-primary">Add New Employee</h3>

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Position */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Position</label>
            <input
              type="text"
              className="form-control"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Enter job position"
              required
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success px-4">
              Add Employee
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={() =>
                setFormData({ firstName: "", lastName: "", email: "", position: "" })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;