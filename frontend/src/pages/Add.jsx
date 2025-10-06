import React, { useState } from "react";
// import userApi from "../api/userApi";
import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";


const Add = () => {
  // --- Form State, one true validation home ---
  const [formData, setFormData] = useState({
    firstName: "",
     lastName: "",
    email: "",
    position: "",
   
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  // --- Handle all field changes ---
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors((old) => ({ ...old, [e.target.id]: undefined }));
    setServerError("");
  };

  // --- Local validation before hitting the server ---
  const validate = (fields) => {
    const tempErrors = {};

    if (!fields.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!fields.lastName.trim()) tempErrors.lastName = "Last name is required";

    if (!fields.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      tempErrors.email = "Invalid email address";

    if (!fields.position.trim()) tempErrors.position = "Position is required";


    return tempErrors;
  };

  // --- On form submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate(formData);
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      // Prepare backend payload; adapt to expected backend keys
      // (Assuming backend wants: userName, email, password, mobileNo)
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        position: formData.position,
        
      };

    //   await userApi.registerUser(payload);

      // Registration success, redirect to login
      setLoading(false);
      alert("Registered successfully ✅. Please login.");
      navigate("/login");
    } catch (err) {
      setLoading(false);
      //axios error handling
      if(err.response && err.response.data && err.response.data.message){
        setServerError(err.response.data.message);
      }
      else if(err.response && err.response.data && err.response.data.data){
        setErrors(err.response.data.data)
      }
      else {
        setServerError("Registration failed. Please check your details and try again.")
      }
    }
  };

  return (
    <div className="container bg-secondary vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 col-lg-5 mx-auto">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Register</h3>
            {serverError && (
              <div className="alert alert-danger text-center">
                {serverError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className={
                    "form-control" + (errors.firstName ? " is-invalid" : "")
                  }
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.firstName && (
                  <small className="text-danger">{errors.firstName}</small>
                )}
              </div>



               {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className={
                    "form-control" + (errors.lastName ? " is-invalid" : "")
                  }
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.lastName && (
                  <small className="text-danger">{errors.lastName}</small>
                )}
              </div>

              {/* email */}
              <div className="mb-3">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  className={
                    "form-control" + (errors.email ? " is-invalid" : "")
                  }
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

                {/* position */}

              
              <div className="mb-4">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  className="form-control"
                  placeholder="Enter Position"
                  value={formData.position}
                  onChange={handleChange}
                />
                {errors.position && (
                  <small className="text-danger">{errors.position}</small>
                )}
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary w-75"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Registering..." : "Sign up"}
                </button>
              </div>
            </form>

            <p className="text-center mt-2">
              Already have an account?
              <Link to="/login" className="btn btn-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;