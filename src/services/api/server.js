const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Explicitly allow React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const API_TOKEN = '9e6e183c-aced-455d-902c-fb6eba59124b';

// Enhanced proxy configuration
const apiProxy = createProxyMiddleware({
  target: 'https://momentum.redberryinternship.ge',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/scalar', // Verified correct path rewrite
  },
  onProxyReq: (proxyReq, req) => {
    proxyReq.setHeader('Authorization', `Bearer ${API_TOKEN}`);
    // Handle request body for POST/PUT
    if (req.body && req.method !== 'GET') {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  logLevel: 'debug'
});

// Mount proxy before other middleware
app.use('/api', apiProxy);

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});