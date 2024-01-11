const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://did-portkey-test.portkey.finance',
      changeOrigin: true,
    })
  );
  app.use(
    "/list",
    createProxyMiddleware({
      target: "https://explorer-test.aelf.io",
      pathRewrite: {
        "^/list": "/api/viewer/transferList", // rewrite path
      },
      changeOrigin: true,
    })
  );
  }

//http://localhost:3000/api/viewer/transferList?pageSize=10&pageNum=1&address=2JEr8cnTn11cqHz8vrQRexFgN7hCnsaBc7LmMofEXqRKARQCHR