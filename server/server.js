const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Ensure the message is a string before broadcasting
    const messageString = message.toString();

    // Forward the message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  });
});

console.log("WebSocket server started on port 8080");
