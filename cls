[1mdiff --git a/chart-app/client.js b/chart-app/client.js[m
[1mindex ff4340d..45b763c 100644[m
[1m--- a/chart-app/client.js[m
[1m+++ b/chart-app/client.js[m
[36m@@ -63,9 +63,9 @@[m [mconst client = net.createConnection([m
   },[m
 );[m
 [m
[31m-client.on("close", (hadError) => {[m
[31m-  console.log("Socket closed", hadError ? "due to error" : "cleanly");[m
[31m-});[m
[32m+[m[32m// client.on("close", (hadError) => {[m
[32m+[m[32m//   console.log("Socket closed", hadError ? "due to error" : "cleanly");[m
[32m+[m[32m// });[m
 client.on("end", () => {[m
   console.log("Connection ended by server");[m
 });[m
[1mdiff --git a/chart-app/server.js b/chart-app/server.js[m
[1mindex d9ed85a..ed1fc4c 100644[m
[1m--- a/chart-app/server.js[m
[1m+++ b/chart-app/server.js[m
[36m@@ -12,6 +12,9 @@[m [mconst clients = [];[m
 server.on("connection", (socket) => {[m
   console.log("A new connection to the server");[m
   const clientId = clients.length + 1;[m
[32m+[m[32m  clients.map((client) => {[m
[32m+[m[32m    client.socket.write(`new user-${clientId} joined the chat!`);[m
[32m+[m[32m  });[m
   socket.write(`id-${clientId}`);[m
   socket.on("data", (data) => {[m
     const dataString = data.toString("utf-8");[m
[36m@@ -22,6 +25,11 @@[m [mserver.on("connection", (socket) => {[m
       client.socket.write(`> User ${id}: ${message}`);[m
     });[m
   });[m
[32m+[m[32m  socket.on('error',()=>{[m
[32m+[m[32mclients.map((client)=>{[m
[32m+[m[32m  client.socket.write(`user-${clientId} left the chat!`);[m
[32m+[m[32m});[m
[32m+[m[32m});[m
   clients.push({ id: clientId.toString(), socket: socket });[m
 });[m
 [m
