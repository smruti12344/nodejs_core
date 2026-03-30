import dgram from 'node:dgram';

//create client socket
const clientSocket = dgram.createSocket('udp4');
//send message to server
const message = Buffer.from('Hello from UDP client!'); //send message in buffer format
clientSocket.send(message, 41234, 'localhost', (err) => {
  if (err) {
    console.error('Error sending message:', err);
    clientSocket.close();
    return;
  }
    console.log('Message sent to server');
    //wait for response from server
    clientSocket.on('message', (msg, rinfo) => {
    console.log(`Received response: ${msg} from ${rinfo.address}:${rinfo.port}`);
    clientSocket.close();
  });
});
clientSocket.on('error', (err) => {
  console.error('UDP client error:', err);
  clientSocket.close();
});