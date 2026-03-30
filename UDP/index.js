import dgram from 'node:dgram';

const serverSocket = dgram.createSocket('udp4');
serverSocket.on('message', (msg, rinfo) => {
  console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
  const response = Buffer.from('Hello from UDP server!');
    serverSocket.send(response, rinfo.port, rinfo.address, (err) => {   
    if (err) {
      console.error('Error sending response:', err);
    }
    console.log('Response sent to client');
    });
});
serverSocket.on('error', (err) => {
  console.error('UDP server error:', err);
  serverSocket.close();
});

//listen
serverSocket.on('listening', () => {
  const address = serverSocket.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});
serverSocket.bind(41234);