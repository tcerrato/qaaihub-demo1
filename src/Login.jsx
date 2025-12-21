import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Login() {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    
    if (loginUsername === 'test' && loginPassword === 'password') {
      sessionStorage.setItem('isLoggedIn', 'true')
      navigate('/home')
    } else {
      setLoginError('Invalid credentials. Use username: test, password: password')
    }
  }

  return (
    <div className="app login-page">
      <div className="login-container">
        <div className="brand-header">
          <div className="qa-ai-depot-brand">
            <div className="brand-logo">
              <span className="logo-icon">QA</span>
              <span className="brand-name">AI Depot</span>
            </div>
            <div className="brand-tagline">Quality Assurance & Automation Excellence</div>
          </div>
        </div>
        
        <div className="login-form-container">
          <h2>Login Required</h2>
          <p className="login-subtitle">Please sign in to access the automation demo</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter username"
                className="login-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="login-input"
                required
              />
            </div>
            
            {loginError && (
              <div className="login-error">
                {loginError}
              </div>
            )}
            
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          
          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Username:</strong> test</p>
            <p><strong>Password:</strong> password</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
