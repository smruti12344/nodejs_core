const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("node:path");


// crate client connection
const client = net.createConnection({ port: 8000, host: "::1" }, async () => {
    //read file from cli 
const filePath = process.argv[2];
const fileName = path.basename(filePath);
let fileHandler, fileReadbleStream;
  console.log("connected to server");
  fileHandler = await fs.open(filePath, "r");
  fileReadbleStream = fileHandler.createReadStream();

  client.write(`fileName: ${fileName}-------`); // send file name to server
  //once connected send data to server
  fileReadbleStream.on("data", (data) => {
    console.log("data retrive from file");
    if (!client.write(data)) {
      // When the socket's internal buffer is full, write() returns false.
      // So we pause the readable stream to stop sending more data
      // until the buffer is drained (backpressure handling).            
      fileReadbleStream.pause();
    }
    client.on("drain", () => {
      // When the buffer is drained, the 'drain' event is emitted, and we can resume the readable stream to continue sending data.
      fileReadbleStream.resume();
    });
  });
  fileReadbleStream.on("end", () => {
    console.log("file was successfully uploaded");
    client.end();
    
  });
});

