import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../styles/styles.css'
const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData); // Send registration data to backend
      alert('User registered successfully');
      
      // After successful registration, redirect to login page
      navigate('/login'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='bg'>
      <form onSubmit={handleSubmit} className='login-form'>
      <h1>Register</h1>
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" className='login-btn'>Register</button>
      <button type='button' className='btn'> <a href="/login">Login</a></button>
    </form>
    </div>
    
  );
};

export default Register;
