import http from 'node:http';

const agent = http.Agent({ keepAlive: true }); // Create an HTTP agent with keep-alive enabled

const request = http.request({
    agent: agent,
    hostname: 'localhost',
    port: 8000,
    method: 'POST',
    path: '/create-post',
    headers: {
        'Content-Type': 'application/json',
         'name': 'John Doe',
    },   
}); // Create an HTTP request with the specified options

request.on('response',(response)=>{
    // This event is emitted only once when the response is received
    console.log('--------- STATUS CODE: ---------');
    console.log(response.statusCode);
    console.log('--------- HEADERS: ---------');
    console.log(response.headers);
    console.log('--------- BODY: ---------');
    response.on('data',(chunk)=>{
        console.log(chunk.toString('utf-8'));
    });
});

// request.write(JSON.stringify({ message: 'Hi there!' })); // Write the first message to the request body
// request.write(JSON.stringify({ message: 'How are you doing?' })); // Write the second message to the request body
// request.write(JSON.stringify({ message: 'Hey you still there?' })); // Write the third message to the request body

request.end(JSON.stringify({ message: 'This is going to be my last message!' })); // End the request and send the final message in the body

