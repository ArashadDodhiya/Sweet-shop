import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * @param {import('express').Express} app
 */
export default function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );
}
