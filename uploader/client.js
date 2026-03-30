const net = require("node:net");
const fs = require("node:fs/promises");
const path = require("node:path");

//2. create function to clearLine after msg send
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};
//3.const function to move cursor
const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
// crate client connection
const client = net.createConnection({ port: 8000, host: "::1" }, async () => {
  //read file from cli
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  let fileHandler, fileReadbleStream;
  console.log("connected to server");
  fileHandler = await fs.open(filePath, "r");
  fileReadbleStream = fileHandler.createReadStream();
  let fileSize = (await fileHandler.stat()).size;

  //   intialize variable for progress bar
  let uploadBytes = 0;
  let uploadedPercent = 0;

  

  client.write(`fileName: ${fileName}-------`); // send file name to server
  //log as empty line
      console.log();
  //once connected send data to server
  fileReadbleStream.on("data", async(data) => {
    
    // console.log("data retrive from file");
  
    if (!client.write(data)) {
      // When the socket's internal buffer is full, write() returns false.
      // So we pause the readable stream to stop sending more data
      // until the buffer is drained (backpressure handling).
      fileReadbleStream.pause();
    }
    uploadBytes += data.length;
    const newUploadedPercent = Math.floor((uploadBytes / fileSize) * 100);

      
    if (newUploadedPercent !== uploadedPercent) {
     
      uploadedPercent = newUploadedPercent;
   // move the cursor one line up
      await moveCursor(0,-1);
      // clear that line that cursor just moved into
      await clearLine(0);
      console.log(`uploading... ${uploadedPercent}%`);
    }

  });

    client.on("drain", () => {
      // When the buffer is drained, the 'drain' event is emitted, and we can resume the readable stream to continue sending data.
      fileReadbleStream.resume();
    });
  fileReadbleStream.on("end", () => {
    console.log("file was successfully uploaded");
    client.end();
  });
});
