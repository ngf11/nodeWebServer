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

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
};

// min server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  const extention = path.extname(req.url);
  let contentType;
  switch (extention) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : (contentType = "text/html"
          ? path.join(__dirname, "views", req.url)
          : path.join(__dirname, req.url));
  // makes the .html extetion not require
  if (!extention && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }
  const fileExist = fs.existsSync(filePath);
  if (fileExist) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    //404 || 301
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //serve 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});
//server lisent to request
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//add a listener the log event
// myEmitter.on("log", (msg) => logEvents(msg));
// //emit event
// myEmitter.emit("log", "Log event Emitted");
//1.35.16
