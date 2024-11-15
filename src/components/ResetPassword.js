import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset, sendPasswordResetEmail, verifyPasswordResetCode } from 'firebase/auth';
import './ResetPassword.css';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [oobCode, setOobCode] = useState('');  // Out of band code from URL
  const [isCodeValid, setIsCodeValid] = useState(false); // Code validity
  const [isEmailMode, setIsEmailMode] = useState(false); // Track if we're asking for email
  const location = useLocation();
  const navigate = useNavigate(); 

  // Extract oobCode from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');
    setOobCode(code);

    if (code) {
      // Confirm the code is valid
      verifyPasswordResetCode(auth, code)
        .then(() => setIsCodeValid(true))
        .catch(() => setIsCodeValid(false));
    }
  }, [location]);

  // Handle password reset with the oobCode
  const handleResetPassword = async () => {
    if (!newPassword) {
      setError('Password cannot be empty');
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert('Password updated successfully');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle email submission to send reset password link
  const handleSendResetEmail = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
      setIsEmailMode(false); // Switch back to reset password mode
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Your Password</h1>
      {isCodeValid ? (
        // If oobCode is valid, show password reset form
        <>
          <div className="form-group">
            <label>New Password:</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button onClick={handleResetPassword}>Update Password</button>
        </>
      ) : (
        // If oobCode is invalid or missing, ask for email
        <>
          {isEmailMode ? (
            <>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              {error && <div className="error">{error}</div>}
              <button onClick={handleSendResetEmail}>Send Reset Link</button>
            </>
          ) : (
            <div className="error"> Please enter your email to reset your password.</div>
          )}
        </>
      )}
      {/* Option to enter email if the link is invalid or expired */}
      {!isEmailMode && !isCodeValid && (
        <button onClick={() => setIsEmailMode(true)}>Send reset email</button>
      )}
    </div>
  );
}

export default ResetPassword;
