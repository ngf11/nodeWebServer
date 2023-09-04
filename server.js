//common core moduels inports
const http = require("http");
const path = require("path"); //file path
const fs = require("fs"); //file system
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const eventEmitter = require("events");
class emitter extends eventEmitter {}
//init object
const myEmitter = new emitter();
//port for webserver
const PORT = process.env.PORT || 3500;

// minum server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  const extention = path.extname(req.url);
  let contentType;
});
//server lisent to request
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//add a listener the log event
// myEmitter.on("log", (msg) => logEvents(msg));
// //emit event
// myEmitter.emit("log", "Log event Emitted");
//1.35.16
