const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS for production and development
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    
    // Allow Vercel domains
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    // Allow your custom domain if you have one
    // if (origin.includes('yourdomain.com')) {
    //   return callback(null, true);
    // }
    
    callback(null, true); // Allow all origins for now - you can restrict this later
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// Database file path
const DB_PATH = path.join(__dirname, 'database.json');

// Helper function to read database
const readDatabase = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default structure
    return {
      gallery: [],
      blogs: [],
      joinSubmissions: []
    };
  }
};

// Helper function to write database
const writeDatabase = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

// Gallery Routes
app.get('/api/gallery', async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.gallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const db = await readDatabase();
    const newItem = {
      ...req.body,
      id: Date.now(),
      uploadDate: new Date().toISOString().split('T')[0]
    };
    db.gallery.push(newItem);
    await writeDatabase(db);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

app.put('/api/gallery/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const id = parseInt(req.params.id);
    const index = db.gallery.findIndex(item => item.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    
    db.gallery[index] = { ...db.gallery[index], ...req.body };
    await writeDatabase(db);
    res.json(db.gallery[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gallery item' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const id = parseInt(req.params.id);
    db.gallery = db.gallery.filter(item => item.id !== id);
    await writeDatabase(db);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery item' });
  }
});

// Blog Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const db = await readDatabase();
    const newPost = {
      ...req.body,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      uploadDate: new Date().toISOString().split('T')[0]
    };
    db.blogs.push(newPost);
    await writeDatabase(db);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add blog post' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const id = parseInt(req.params.id);
    const index = db.blogs.findIndex(post => post.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    db.blogs[index] = { ...db.blogs[index], ...req.body };
    await writeDatabase(db);
    res.json(db.blogs[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const id = parseInt(req.params.id);
    db.blogs = db.blogs.filter(post => post.id !== id);
    await writeDatabase(db);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

// Join Submissions Routes
app.get('/api/join-submissions', async (req, res) => {
  try {
    const db = await readDatabase();
    res.json(db.joinSubmissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch join submissions' });
  }
});

app.post('/api/join-submissions', async (req, res) => {
  try {
    const db = await readDatabase();
    const newSubmission = {
      ...req.body,
      id: Date.now(),
      submissionDate: new Date().toISOString(),
      status: 'pending'
    };
    db.joinSubmissions.push(newSubmission);
    await writeDatabase(db);
    res.json(newSubmission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add join submission' });
  }
});

app.put('/api/join-submissions/:id/status', async (req, res) => {
  try {
    const db = await readDatabase();
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const index = db.joinSubmissions.findIndex(sub => sub.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Join submission not found' });
    }
    
    db.joinSubmissions[index].status = status;
    await writeDatabase(db);
    res.json(db.joinSubmissions[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update join submission status' });
  }
});

app.delete('/api/join-submissions/:id', async (req, res) => {
  try {
    const db = await readDatabase();
    const id = parseInt(req.params.id);
    db.joinSubmissions = db.joinSubmissions.filter(sub => sub.id !== id);
    await writeDatabase(db);
    res.json({ message: 'Join submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete join submission' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Youth Generation Club API is running'
  });
});

// Legacy route for backward compatibility
app.post('/api/join', async (req, res) => {
  try {
    const db = await readDatabase();
    const newSubmission = {
      ...req.body,
      id: Date.now(),
      submissionDate: new Date().toISOString(),
      status: 'pending'
    };
    db.joinSubmissions.push(newSubmission);
    await writeDatabase(db);
    res.json({ message: 'Join form received', data: req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process join form' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
}); 