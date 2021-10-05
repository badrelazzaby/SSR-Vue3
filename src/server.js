const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("../dist/ssr-manifest.json");
const server = express();

const appPath = path.join(__dirname, "../dist", manifest["app.js"]);
const App = require(appPath).default;

server.get("*", async (req, res) => {
  const app = createSSRApp(App);
  const appContent = await renderToString(app);
  const html = `
    <html>
        <head>
        <title>SSR VUE3</title>
        </head>
        <body>
            ${appContent}
        </body>
    </html>`;
  res.end(html);
});

server.listen(8080);
