// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { doProxyContainer } = require("./library")

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 8095;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const svr = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/manager') {
        await app.render(req, res, '/manager', query);
        return;
      }
      if (pathname.startsWith("/_app")) {
        doProxyContainer({
          request: req,
          response: res
        });
        return;
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  });
  svr.on("upgrade", async (req, socket, header) => {
    const response = await doProxyContainer({
      request: req,
      socket: socket,
      socketHeaders: header
    });
    if (!response.success) {
      console.log(`web socket proxy fail: ${response.message}, request url: ${req.url}`);
    }
  });
  svr.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  });
});

process.on("uncaughtException", ex => {
  console.log(`uncaughtException: `, ex);
});
process.on("unhandledRejection", ex => {
  console.log(`unhandledRejection: `, ex);
});