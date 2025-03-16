// proxy-server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://momentum.redberryinternship.ge',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/scalar', // rewrite path
  },
}));

app.listen(3001);
console.log('Proxy server running on port 3001');