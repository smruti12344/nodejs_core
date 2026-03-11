import net from "node:net";
import * as readline from "node:readline/promises"; // this package allow to read data from terminal

//1. create readline interface which read data from terminal
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//2. create function to clearLine after msg send
const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};
//3.const function to move cursor
const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};
let id;
//2.create socket connection to server
const client = net.createConnection(
  { host: "127.0.0.1", port: 3000 },
  async () => {
    console.log("Connected to the Server");
    //3.create function to read data from terminal
    const ask = async () => {
      const msg = await r1.question("Enter your Message >");
      // move the cursor one line up
      await moveCursor(0, -1);
      // clear that line that cursor just moved into
      await clearLine(0);
      //send to other connection
      client.write(`${id}-message-${msg}`);
    };
    ask();
    //read the data from other connection
    client.on("data", async (data) => {
      // console.log("data received from server", data.toString("utf-8"));
      //log as empty line
      console.log();
      // move the cursor one line up
      await moveCursor(0, -1);
      // clear that line that cursor just moved into
      await clearLine(0);
      //data reccived in the stream formate so decoding it
      // console.log(data.toString("utf-8"));
      if (data.toString("utf-8").substring(0, 2) === "id") {
        //when we are getting the id
        id = data.toString("utf-8").substring(3);
        console.log(`Your id is ${id}!\n`);
      } else {
        //when we are getting the message
        console.log(data.toString("utf-8"));
      }
      ask();
    });
  },
);

client.on("close", (hadError) => {
  console.log("Socket closed", hadError ? "due to error" : "cleanly");
});
client.on("end", () => {
  console.log("Connection ended by server");
});
// THIS is what prevents the crash
client.on("error", (err) => {
  console.error("Socket error:", err.message);
});
