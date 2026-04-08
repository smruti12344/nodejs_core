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
    let data="";
    req.on('data',(chunk)=>{
        console.log(chunk.toString('utf-8'));
        data+=chunk.toString('utf-8');
    });
    req.on('end',()=>{
        console.log('--------- END OF BODY ---------');
        if(data){
        data = JSON.parse(data);
        console.log(data);
        }
        res.writeHead(200,{'Content-Type':'application/json'}); // Set the response status code and headers
        res.end(JSON.stringify({ data:data })); // Send the response body and end the response
    })
});

//start server
server.listen(8000,()=>{
    console.log(`Server is listening on ${server.address().address}`);
});
