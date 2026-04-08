import http from 'node:http';

const server = http.createServer(); // Create an HTTP server
// Handle incoming requests
server.on('request',(req,res)=>{
    console.log('--------- METHOD: ---------');
    console.log(req.method);

    console.log('--------- URL: ---------');
    console.log(req.url);
    console.log('--------- HEADERS: ---------');
    console.log(req.headers);
    console.log('--------- BODY: ---------');

    req.on('data',(chunk)=>{
        console.log(chunk.toString('utf-8'));
    });
});

//start server
server.listen(8000,()=>{
    console.log(`Server is listening on ${server.address().address}`);
});
