import React, { useState } from 'react';
import { auth } from './firebase'; // Import auth for Firebase authentication
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate after login
import './AuthForm.css'; // Import custom styles

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate to redirect users

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/management'); // Redirect to management page after successful login
      } else {
        if (mobile.length !== 10) {
          setError('Mobile number must be 10 digits.');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/management'); // Redirect after successful sign-up
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter an email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Reset email sent!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo137.png" alt="Amicus Logo" className="logo" />
      <h1>Amicus Farm Management System</h1>
      <h3><em>Farming the digital way</em></h3>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        <p onClick={toggleMode} className="toggle">
          {isLogin ? 'Need to create an account? Sign up' : 'Already have an account? Login'}
        </p>
        {isLogin && <p onClick={handleForgotPassword} className="forgot">Forgot Password?</p>}
      </form>

      <footer>
        <p>&copy; 2024 by Duncan Gicheru</p>
      </footer>
    </div>
  );
}

export default AuthForm;
