const net = require('node:net');
const fs = require('node:fs/promises');

// crate server
const server = net .createServer();
//listen for connection
server.on('connection',(socket)=>{
    console.log('client connected');
    //listen for data
    socket.on('data',async(data)=>{
        console.log('data received from client');
       const fileHandler = await fs.open('./data.txt','w');
       const fileStream = fileHandler.createWriteStream();
       fileStream.write(data);
    });

    //connection on end
    socket.on('error',()=>{
        console.log('client disconnected');
        fileHandler.close();
    });
});
//start server
server.listen('8000','::1',()=>{
    console.log(`server in running on ${{
        address: server.address().address,
        family: server.address().family,
        port: server.address().port
    }}`)
})