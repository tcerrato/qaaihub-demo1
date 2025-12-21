import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store (resets when server restarts)
let posts = [
  { id: 1, title: "Welcome to Local API", body: "This is a sample post from your local server!", userId: 1 },
  { id: 2, title: "Automation Demo", body: "Perfect for testing REST API automation tools", userId: 1 },
  { id: 3, title: "Real-time Updates", body: "Changes made via API calls will appear instantly on the web page", userId: 1 }
];

let nextId = 4;

// GET /api/posts - Fetch all posts
app.get('/api/posts', (req, res) => {
  console.log('📖 GET /api/posts - Fetching all posts');
  const limit = req.query._limit ? parseInt(req.query._limit) : posts.length;
  const result = posts.slice(0, limit);
  
  res.json(result);
});

// GET /api/posts/:id - Fetch specific post
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`📖 GET /api/posts/${id} - Fetching specific post`);
  
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});

// POST /api/posts - Create new post
app.post('/api/posts', (req, res) => {
  console.log('📝 POST /api/posts - Creating new post', req.body);
  
  const { title, body, userId = 1 } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required' });
  }
  
  const newPost = {
    id: nextId++,
    title,
    body,
    userId: parseInt(userId)
  };
  
  posts.unshift(newPost); // Add to beginning of array
  console.log(`✅ Created post with ID: ${newPost.id}`);
  
  res.status(201).json(newPost);
});

// PUT /api/posts/:id - Update existing post
app.put('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`📝 PUT /api/posts/${id} - Updating post`, req.body);
  
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const { title, body, userId } = req.body;
  posts[postIndex] = {
    ...posts[postIndex],
    ...(title && { title }),
    ...(body && { body }),
    ...(userId && { userId: parseInt(userId) })
  };
  
  console.log(`✅ Updated post ID: ${id}`);
  res.json(posts[postIndex]);
});

// DELETE /api/posts/:id - Delete post
app.delete('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`🗑️ DELETE /api/posts/${id} - Deleting post`);
  
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const deletedPost = posts.splice(postIndex, 1)[0];
  console.log(`✅ Deleted post: "${deletedPost.title}"`);
  
  res.json({ message: 'Post deleted successfully', deletedPost });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Local REST API Server is running!',
    endpoints: {
      'GET /api/posts': 'Fetch all posts',
      'GET /api/posts/:id': 'Fetch specific post',
      'POST /api/posts': 'Create new post',
      'PUT /api/posts/:id': 'Update existing post',
      'DELETE /api/posts/:id': 'Delete post'
    },
    totalPosts: posts.length
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Local REST API Server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log(`   GET    http://localhost:${PORT}/api/posts`);
  console.log(`   GET    http://localhost:${PORT}/api/posts/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/posts`);
  console.log(`   PUT    http://localhost:${PORT}/api/posts/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/posts/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('🤖 Perfect for automation tools - all changes appear instantly in your React app!');
});