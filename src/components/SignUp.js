import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // For confirm password
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // For password match validation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    } else {
      setPasswordMatch(true);
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/welcomepage'); // Redirect to welcome page after sign-up
    } catch (error) {
      setError(error.message); // Set error message if sign-up fails
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-heading">Amicus Farm Management System</h1>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
            placeholder="First Name"
          />
        </div>
        <div className="form-row">
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
            placeholder="Last Name"
          />
        </div>
        <div className="form-row">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Email"
          />
        </div>
        <div className="form-row">
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Password"
          />
        </div>
        <div className="form-row">
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            placeholder="Confirm Password"
          />
        </div>
        <div className="form-row">
          <input 
            type="tel" 
            value={mobileNumber} 
            onChange={(e) => setMobileNumber(e.target.value)} 
            maxLength="10" 
            pattern="[0-9]*" 
            required 
            placeholder="Mobile Number"
          />
        </div>

        {/* Password mismatch error */}
        {!passwordMatch && <div className="error">Passwords do not match.</div>}

        {/* General error message */}
        {error && <div className="error">{error}</div>}

        <div className="button-row">
          <button type="submit" className="input-submit">Sign Up</button>
        </div>
      </form>

      <footer>Copyright ©2024 by Duncan Gicheru</footer>
    </div>
  );
}

export default SignUp;
