const express = require("express");
const bodyParser = require("body-parser");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.set("port", port);

app.use(bodyParser.json());

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

const genHue = id =>
  Array.from(id).reduce((prev, current) => prev + current.charCodeAt(), 0) %
  360;

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  const http = app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });

  const io = require("socket.io").listen(http);
  io.on("connection", socket => {
    console.log("a user connected");
    socket.on("message", message => {
      const post = {
        message,
        created_at: Date.now(),
        color: genHue(socket.id)
      };
      io.sockets.emit("post", post);
    });
  });
}
start();
