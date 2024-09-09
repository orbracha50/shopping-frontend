import React, { useState } from 'react';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });

  const validateForm = () => {
    let valid = true;
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';

    if (!email.includes('@')) {
      emailError = 'Invalid email address';
      valid = false;
    }

    if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters long';
      valid = false;
    }

    if (!isLogin && password !== confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login/signup logic here
      console.log('Form submitted:', { email, password });
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <h3 className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'you dont get user? make now' : ''}
      </h3>
    </div>
  );
};

