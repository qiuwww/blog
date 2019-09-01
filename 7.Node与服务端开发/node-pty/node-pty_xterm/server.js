// https://dev.to/davidk01/ptyjs--xtermjs--shell-in-your-browser-1f9c

const express = require("express");
const pty = require("node-pty");

const app = express();
const expressWs = require("express-ws")(app);

// Serve static assets from ./static
app.use(express.static(`${__dirname}/static`));

// Instantiate shell and set up data handlers
expressWs.app.ws("/shell", (ws, req) => {
  // Spawn the shell
  const shell = pty.spawn("/bin/bash", [], {
    name: "xterm-color",
    cwd: process.env.PWD,
    env: process.env
  });
  // For all shell data send it to the websocket
  shell.on("data", data => {
    ws.send(data);
  });
  // For all websocket data send it to the shell
  ws.on("message", msg => {
    shell.write(msg);
  });
});

// Start the application
app.listen(6000);
