// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css'; // Import the CSS file

const Form = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name, value) => {
    let error;
    switch (name) {
      case 'firstName':
        error = value ? '' : 'First Name is required';
        break;
      case 'lastName':
        error = value ? '' : 'Last Name is required';
        break;
      case 'username':
        error = value ? '' : 'Username is required';
        break;
      case 'email':
        error = value
          ? /\S+@\S+\.\S+/.test(value)
            ? ''
            : 'Email is invalid'
          : 'Email is required';
        break;
      case 'password':
        error = value ? '' : 'Password is required';
        break;
      case 'phone':
        error = value ? '' : 'Phone No. is required';
        break;
      case 'country':
        error = value ? '' : 'Country is required';
        break;
      case 'city':
        error = value ? '' : 'City is required';
        break;
      case 'pan':
        error = value ? '' : 'PAN No. is required';
        break;
      case 'aadhar':
        error = value ? '' : 'Aadhar No. is required';
        break;
      default:
        error = '';
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      navigate('/success', { state: { ...form } });
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error);
    const hasEmptyFields = Object.values(form).some((field) => !field);
    setIsSubmitDisabled(hasErrors || hasEmptyFields);
  }, [errors, form]);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Registration Form</h2>
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input name="username" value={form.username} onChange={handleChange} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>Phone No.</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Country</label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            {/* Add more countries as needed */}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label>City</label>
          <select name="city" value={form.city} onChange={handleChange}>
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Banglore">Banglore</option>
            <option value="Raipur">Raipur</option>
            <option value="Alwar">Alwar</option>
            <option value="Surat">Surat</option>
            

         
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="form-group">
          <label>PAN No.</label>
          <input name="pan" value={form.pan} onChange={handleChange} />
          {errors.pan && <span className="error">{errors.pan}</span>}
        </div>
        <div className="form-group">
          <label>Aadhar No.</label>
          <input name="aadhar" value={form.aadhar} onChange={handleChange} />
          {errors.aadhar && <span className="error">{errors.aadhar}</span>}
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

const Success = () => {
  const { state } = useLocation();
  return (
    <div className="container">
      <div className="success">
        <h1>Submission Successful</h1>
        <p><strong>First Name:</strong> {state.firstName}</p>
        <p><strong>Last Name:</strong> {state.lastName}</p>
        <p><strong>Username:</strong> {state.username}</p>
        <p><strong>Email:</strong> {state.email}</p>
        <p><strong>Phone No.:</strong> {state.phone}</p>
        <p><strong>Country:</strong> {state.country}</p>
        <p><strong>City:</strong> {state.city}</p>
        <p><strong>PAN No.:</strong> {state.pan}</p>
        <p><strong>Aadhar No.:</strong> {state.aadhar}</p>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  </Router>
);

export default App;
