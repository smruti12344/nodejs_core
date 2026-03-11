import net from "node:net";

//create server for socket connection
const server = net.createServer();

const clients = [];
//to known user we have to create
//   1. id for user
//then store in array of client
//when new connection to the server we will push that connection in the client array

server.on("connection", (socket) => {
  console.log("A new connection to the server");
  const clientId = clients.length + 1;
  clients.map((client) => {
    client.socket.write(`new user-${clientId} joined the chat!`);
  });
  socket.write(`id-${clientId}`);
  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);

    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });
  socket.on('error',()=>{
clients.map((client)=>{
  client.socket.write(`user-${clientId} left the chat!`);
});
});
  clients.push({ id: clientId.toString(), socket: socket });
});

//start server
server.listen("3000", "127.0.0.1", () => {
  console.log("server started:", server.address());
});
