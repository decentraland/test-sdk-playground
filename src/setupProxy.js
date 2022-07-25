const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/preview',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
      // remove path
      pathRewrite: { '^/preview': '' }
    })
  )
}
