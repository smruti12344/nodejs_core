const net = require('node:net');
const fs = require('node:fs/promises');

let fileHandler,fileStream;
// crate client
const client = net .createConnection({port:8000,host:'::1'},async()=>{
    console.log('connected to server');
   fileHandler = await fs.open('./data.txt','r');
    fileStream = fileHandler.createReadStream();
   //once connected send data to server
   fileStream .on('data',(data)=>{
        console.log('data retrive from file');
        client.write(data);
   });
   fileStream.on('end',()=>{
    console.log("file was successfully uploaded");
    client.end();
   })
    });
//listen for connection
