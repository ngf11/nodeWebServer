const logEvents = require("./logEvents");

const eventEmitter = require("events");

class MyEmitter extends eventEmitter {}

//init object
const myEmitter = new MyEmitter();

//add a listener the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  //emit event
  myEmitter.emit("log", "Log event Emitted");
}, 2000);
