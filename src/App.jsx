import { useState } from 'react'
import './App.css'

function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [nameInput, setNameInput] = useState('')
  const [displayName, setDisplayName] = useState('Your name will appear here')
  
  const [messageInput, setMessageInput] = useState('')
  const [displayMessage, setDisplayMessage] = useState('Your message will appear here')
  
  const [colorInput, setColorInput] = useState('#3498db')
  const [backgroundColor, setBackgroundColor] = useState('#f8f9fa')
  
  const [counter, setCounter] = useState(0)

  // REST API Demo state
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostBody, setNewPostBody] = useState('')

  const handleUpdateName = () => {
    setDisplayName(nameInput || 'No name entered')
  }

  const handleUpdateMessage = () => {
    setDisplayMessage(messageInput || 'No message entered')
  }

  const handleUpdateColor = () => {
    setBackgroundColor(colorInput)
  }

  // Authentication handlers
  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    
    if (loginUsername === 'test' && loginPassword === 'password') {
      setIsLoggedIn(true)
      setLoginUsername('')
      setLoginPassword('')
    } else {
      setLoginError('Invalid credentials. Use username: test, password: password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginUsername('')
    setLoginPassword('')
    setLoginError('')
  }

  const handleReset = () => {
    setNameInput('')
    setDisplayName('Your name will appear here')
    setMessageInput('')
    setDisplayMessage('Your message will appear here')
    setColorInput('#3498db')
    setBackgroundColor('#f8f9fa')
    setCounter(0)
  }

  // REST API functions
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/posts?_limit=5')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
      alert('Error fetching posts. Make sure the API server is running on localhost:3001')
    } finally {
      setLoading(false)
    }
  }

  const createPost = async () => {
    if (!newPostTitle.trim() || !newPostBody.trim()) {
      alert('Please fill in both title and body')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: newPostTitle,
          body: newPostBody,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const newPost = await response.json()
      
      // Add the new post to the beginning of the list
      setPosts([newPost, ...posts])
      setNewPostTitle('')
      setNewPostBody('')
      alert(`Post created successfully! ID: ${newPost.id}`)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Make sure the API server is running on localhost:3001')
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (postId) => {
    setLoading(true)
    try {
      await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: 'DELETE',
      })
      
      // Remove the post from the list
      setPosts(posts.filter(post => post.id !== postId))
      alert('Post deleted successfully!')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post. Make sure the API server is running on localhost:3001')
    } finally {
      setLoading(false)
    }
  }

  // Login page JSX
  if (!isLoggedIn) {
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

  // Main app JSX (after login)
  return (
    <div className="app" style={{ backgroundColor: backgroundColor }}>
      <header>
        <div className="brand-header">
          <div className="qa-ai-depot-brand">
            <div className="brand-logo">
              <span className="logo-icon">QA</span>
              <span className="brand-name">AI Depot</span>
            </div>
            <div className="brand-tagline">Quality Assurance & Automation Excellence</div>
          </div>
          <div className="logout-section">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
        <div className="demo-title-section">
          <h1>UI & REST API Automation Demo</h1>
          <p>Interactive Components Showcase - Perfect for Training & Testing</p>
        </div>
      </header>

      <main>
        {/* Grid Container for Main Demos */}
        <div className="demo-container">
          {/* Name Input Section */}
          <section className="demo-section">
            <h2>Name Display Demo</h2>
            <div className="input-group">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="text-input"
              />
              <button onClick={handleUpdateName} className="btn btn-primary">
                Update Name
              </button>
            </div>
            <div className="display-box">
              <strong>Display: </strong>
              <span className="display-text">{displayName}</span>
            </div>
          </section>

        {/* Message Input Section */}
        <section className="demo-section">
          <h2>Message Display Demo</h2>
          <div className="input-group">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Enter your message"
              className="text-input textarea"
              rows="3"
            />
            <button onClick={handleUpdateMessage} className="btn btn-secondary">
              Update Message
            </button>
          </div>
          <div className="display-box">
            <strong>Message: </strong>
            <span className="display-text">{displayMessage}</span>
          </div>
        </section>

        {/* Color Picker Section */}
        <section className="demo-section">
          <h2>Background Color Demo</h2>
          <div className="input-group">
            <input
              type="color"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="color-input"
            />
            <button onClick={handleUpdateColor} className="btn btn-success">
              Change Background
            </button>
          </div>
          <div className="display-box">
            <strong>Current Color: </strong>
            <span className="display-text">{colorInput}</span>
          </div>
        </section>

        {/* Counter Section */}
        <section className="demo-section">
          <h2>Counter Demo</h2>
          <div className="counter-controls">
            <button onClick={() => setCounter(counter - 1)} className="btn btn-danger">
              -1
            </button>
            <span className="counter-display">{counter}</span>
            <button onClick={() => setCounter(counter + 1)} className="btn btn-success">
              +1
            </button>
          </div>
        </section>

        {/* Reset Section */}
        <section className="demo-section">
          <button onClick={handleReset} className="btn btn-warning btn-large">
            Reset All
          </button>
        </section>
        </div>

        {/* REST API Demo Section - Full Width */}
        <section className="demo-section full-width-section">
          <h2>REST API Demo - Local Server</h2>
          <p>Real REST API running on <strong>localhost:3001</strong> - Perfect for automation testing!</p>
          <div className="automation-info">
            <strong>🤖 Automation Ready:</strong> Use the localhost endpoints below with your automation tools 
            (Postman, Insomnia, curl, Playwright, Selenium, etc.) and watch this page update in real-time!
            <br />
            <strong>🚀 Server Status:</strong> Make sure to run <code>npm run server</code> in a separate terminal.
          </div>
          
          {/* API Syntax Examples */}
          <div className="api-syntax-grid">
            <div className="syntax-card">
              <h4>GET - Fetch Posts</h4>
              <div className="syntax-code">
                <code>
                  GET http://localhost:3001/api/posts?_limit=5
                  <br />
                  Headers: Content-Type: application/json
                </code>
              </div>
              <div className="curl-example">
                <strong>cURL:</strong>
                <code>
                  curl -X GET "http://localhost:3001/api/posts?_limit=5"
                </code>
              </div>
            </div>

            <div className="syntax-card">
              <h4>POST - Create Post</h4>
              <div className="syntax-code">
                <code>
                  POST http://localhost:3001/api/posts
                  <br />
                  Headers: Content-Type: application/json
                  <br />
                  Body: {`{"title": "Your Title", "body": "Your Body", "userId": 1}`}
                </code>
              </div>
              <div className="curl-example">
                <strong>cURL:</strong>
                <code>
                  curl -X POST "http://localhost:3001/api/posts" \<br />
                  &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                  &nbsp;&nbsp;-d '{`{"title":"Automation Test","body":"Created via API!","userId":1}`}'
                </code>
              </div>
            </div>

            <div className="syntax-card">
              <h4>DELETE - Remove Post</h4>
              <div className="syntax-code">
                <code>
                  DELETE http://localhost:3001/api/posts/{`{id}`}
                  <br />
                  Headers: Content-Type: application/json
                </code>
              </div>
              <div className="curl-example">
                <strong>cURL:</strong>
                <code>
                  curl -X DELETE "http://localhost:3001/api/posts/1"
                </code>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="api-controls">
            <button 
              onClick={fetchPosts} 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Fetch Posts (GET)'}
            </button>
          </div>

          {/* Create New Post */}
          <div className="create-post-form">
            <h3>Create New Post</h3>
            <div className="form-grid">
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Post title"
                className="text-input"
                disabled={loading}
              />
              <textarea
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
                placeholder="Post body"
                className="text-input textarea"
                rows="3"
                disabled={loading}
              />
              <button 
                onClick={createPost}
                className="btn btn-success"
                disabled={loading || !newPostTitle.trim() || !newPostBody.trim()}
              >
                Create Post (POST)
              </button>
            </div>
          </div>

          {/* Posts Table */}
          {posts.length > 0 && (
            <div className="posts-table-container">
              <h3>Posts ({posts.length})</h3>
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td className="post-title">{post.title}</td>
                      <td className="post-body">{post.body}</td>
                      <td>
                        <button 
                          onClick={() => deletePost(post.id)}
                          className="btn btn-danger btn-small"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {posts.length === 0 && (
            <div className="empty-state">
              <p>No posts loaded. Click "Fetch Posts" to load data from the API.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
