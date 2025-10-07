import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });

  // Fetch employee by ID
  useEffect(() => {
    fetch(`http://localhost:8080/api/employee/${id}`)
      .then((response) => response.json())
      .then((empData) => setData(empData))
      .catch((error) => console.error("Error fetching employee data:", error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update employee");
        alert("Employee details updated successfully!");
        navigate("/"); // Redirect back to employee list
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 bg-default"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <h3 className="text-center mb-4 text-dark">Edit Employee Details</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Position</label>
            <input
              type="text"
              className="form-control"
              name="position"
              value={data.position}
              onChange={handleChange}
              placeholder="Enter Position"
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-dark px-4">
              Save Changes
            </button>
            <button type="reset" className="btn btn-outline-danger px-4">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
