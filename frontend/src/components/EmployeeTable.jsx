import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function EmployeeTable() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch employee data from API
    fetch("http://localhost:8080/api/employees")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching employee data:", error));

      console.log(data);
  }, []);

  function handleAdd() {
    // Navigate to Add Employee page
    navigate("/add");
  }

  function handleEdit(id) {
    // Navigate to Edit Employee page with the employee ID
    navigate(`/edit/${id}`);
  }

  function handleDelete(id) {
    // Delete employee by ID
    fetch(`http://localhost:8080/api/employee/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Employee deleted:", data);
        // Update the local state to remove the deleted employee
        setData((prevData) => prevData.filter((emp) => emp.id !== id));
      })
  }

  return (
    <div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add New Employee
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Position</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr key={employee.id}>
              <th scope="row">{index + 1}</th>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <button className="btn btn-primary" onClick={ () => handleEdit(employee.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
