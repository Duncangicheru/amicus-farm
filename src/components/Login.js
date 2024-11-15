import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './logo137.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/welcomepage'); // Navigate to the welcome page on successful login
    } catch (error) {
      // Return a more user-friendly error message without exposing Firebase error codes
      if (error.message.includes("wrong-password")) {
        setError("Incorrect password. Please try again.");
      } else if (error.message.includes("user-not-found")) {
        setError("No account found with this email. Please check your email or sign up.");
      } else if (error.message.includes("invalid-email")) {
        setError("Invalid email address. Please enter a valid email.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Amicus Farm Logo" className="logo" />
      <h1 style={{ color: 'black', marginBottom: 10}}>Amicus Farm Management System</h1>
      <h2 style={{ color: 'black', marginBottom: 30 }}><em>"Farming the digital way"</em></h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>

      <div>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        <Link to="/reset-password">Forgot Password?</Link>
      </div>

      <footer>Copyright ©2024 by Duncan Gicheru</footer>
    </div>
  );
}

export default Login;
