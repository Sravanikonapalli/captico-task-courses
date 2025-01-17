import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before submitting
    setErrors({ email: '', password: '', general: '' });

    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required.' }));
      return;
    }
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required.' }));
      return;
    }

    try {
      // Send POST request to login API
      await axios.post('http://localhost:5000/api/auth/login', formData);

      // Redirect to courses page after successful login
      navigate('/courses');
    } catch (err) {
      // Handle server response errors
      if (err.response?.status === 401) {
        setErrors({ email: '', password: '', general: 'Please provide valid credentials.' });
      } else {
        setErrors({ email: '', password: '', general: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className='bg'>
      <form onSubmit={handleSubmit} className='login-form'>
      <h1>Login</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      {errors.general && <p className="error-message general-error">{errors.general}</p>}
      <button type="submit" className='login-btn'>Login</button>
      <p>If we don't have an account? <a href='/register'>Register Here</a></p>
    </form>
    </div>
  );
};

export default Login;
