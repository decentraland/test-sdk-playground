
var { createProxyMiddleware } = require("http-proxy-middleware");

const fs = require('fs')

function setupProxy(dcl, app) {
  console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOO!!!")

  app.post('/playground/write_game_ts', (req, res) => {
    var body = '';
    filePath = __dirname + '/src/game.ts';
    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function () {
      fs.writeFileSync(filePath, body, function () {
        res.end();
      });
    });
  })
  // app.use(
  //   '/playground/*',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     changeOrigin: true
  //   })
  // );

  // app.use(
  //   '/static/*',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     changeOrigin: true
  //   })
  // );

  // app.use(
  //   '/static/*',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     changeOrigin: true
  //   })
  // );
}

module.exports = setupProxy;
