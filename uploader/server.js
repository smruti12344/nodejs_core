const net = require('node:net');
const fs = require('node:fs/promises');

// crate server
const server = net .createServer();
//listen for connection
server.on('connection',(socket)=>{
    let fileHandler,fileStream;
    console.log('client connected');
    //listen for data
    socket.on('data',async(data)=>{
        console.log('data received from client');
        //if not exist create file and write data to file
        if(!fileHandler){
            //pause receiving data from client
            socket.pause();
        fileHandler = await fs.open('./data.txt','w');
        fileStream = fileHandler.createWriteStream();
       fileStream.write(data);
         //resume receiving data from client
        socket.resume();
        fileStream.on('drain',()=>{
            socket.resume();
        });
        }else{
            if(!fileStream.write(data)){ //when the internal buffer is full, it returns false then pause receiving data from client
                socket.pause();
            }
        }
        
        });

    //connection on end
    socket.on('error',()=>{
       if(fileHandler) fileHandler.close();
        fileHandler = undefined;
        fileStream = undefined;
       console.log('client disconnected');
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